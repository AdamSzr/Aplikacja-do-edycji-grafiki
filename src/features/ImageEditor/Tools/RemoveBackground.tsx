
import * as bodyPix from '@tensorflow-models/body-pix';
import imageCompression from 'browser-image-compression';
import { useContext, useEffect, useRef, useState } from 'react';
import { ImageEditorContext, ImageEditorContextType } from '../ImageEditor';

import defaultMlConfig from '@/src/utils/defaultMlConfig';
import { Button } from '@mui/material';
import * as tf from '@tensorflow/tfjs';
import useFormFieldsUpdater from '../../objectUpdater';
import downloadImgFromCanvas from '@/src/utils/downloadImgFromCanvas';



const RemoveBackground = () => {
  const imgEditorCtx = useContext<ImageEditorContextType>(ImageEditorContext)
  const processorCanvas = useRef<HTMLCanvasElement | null>()  // imgEditorCtx.canvas.current?.getContext('2d')
  const processorCanvas2D = useRef<CanvasRenderingContext2D | null>()
  const [isBackgroundProcessed, setIsBackgroundProcessed] = useState(false)

  const [handleUpdate, get] = useFormFieldsUpdater(defaultMlConfig())
  tf.setBackend('cpu')

  useEffect(() => {

    if (isBackgroundProcessed == true) {
      resetCanvas()
      console.log("bg-removed")
    }
  }, [get()])


  useEffect(() => {
    if (processorCanvas.current != null && !processorCanvas2D.current) {
      processorCanvas2D.current = processorCanvas.current?.getContext('2d')
    }
  }, [processorCanvas.current])

  useEffect(() => {
    console.log({ imgEditorCtx })
    if (processorCanvas.current != undefined) {
      imageCompression.drawFileInCanvas(imgEditorCtx.originalFile!)
        .then(
          ([imgEle, offsetCanvas]) => {

            const { width, height } = imgEle

            setTimeout(() => {
              console.log({ curr: processorCanvas2D.current })
              if (processorCanvas2D.current)
                processorCanvas2D.current.drawImage(imgEle, 0, 0, width, height)
            }, 200);

          }
        )
    }

  }, [])


  const resetCanvas = () => {
    setIsBackgroundProcessed(false)
    imageCompression.drawFileInCanvas(imgEditorCtx.originalFile!)
      .then(
        ([imgEle, offsetCanvas]) => {
          const bbCtx2D = processorCanvas.current?.getContext('2d')
          console.log('drawing original')
          const sizes = { width: imgEle.width, height: imgEle.height }
          console.log({ sizes })
          imgEditorCtx.setCanvasSize(sizes)

          setTimeout(() => {

            bbCtx2D?.drawImage(imgEle, 0, 0)
          }, 200);

        }
      )
  }



  const backgroundRemoval = async () => {
    const bbCanvas = processorCanvas.current
    const bbCanvas2D = processorCanvas2D.current
    if (!bbCanvas || !bbCanvas2D)
      return

    const net = await bodyPix.load(get())
    const segmentation = await net.segmentPerson(bbCanvas, get())

    const { data: imgData } = bbCanvas2D.getImageData(0, 0, bbCanvas.width, bbCanvas.height)

    const newImg = bbCanvas2D.createImageData(bbCanvas.width, bbCanvas.height)
    const newImgData = newImg.data

    segmentation.data.forEach((segment, i) => {
      if (segment == 1) {
        newImgData[i * 4] = imgData[i * 4]
        newImgData[i * 4 + 1] = imgData[i * 4 + 1]
        newImgData[i * 4 + 2] = imgData[i * 4 + 2]
        newImgData[i * 4 + 3] = imgData[i * 4 + 3]
      }
    })

    bbCanvas2D.putImageData(newImg, 0, 0)
    setIsBackgroundProcessed(true)
  }


  const downloadImg = () => {
    if (!processorCanvas.current) return


    downloadImgFromCanvas(processorCanvas.current)
    // processorCanvas2D.current?.getImageData(0, 0, imgEditorCtx.canvasSize?.width, imgEditorCtx.canvasSize?.height)


  }

  // if (!imgEditorCtx.canvasSize) return
  // console.log(imgEditorCtx.canvasSize)

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ margin: "0 auto" }}>

          <canvas ref={processorCanvas as any} height={imgEditorCtx.canvasSize?.height} width={imgEditorCtx.canvasSize?.width} />

        </div>
        <div style={{
          display: `flex`,
          justifyContent: `center`
        }}>
          <table style={{ borderSpacing: `10px` }}>
            <thead>
              <tr style={{ fontWeight: '700' }}><th>opcja</th><th>ustawienia</th></tr>
            </thead>
            <tbody>

              <tr>
                <td>architecture
                </td>
                <td>
                  <select
                    defaultValue={get().architecture}
                    onChange={(e) => {
                      const v = e.target.value
                      handleUpdate('architecture', v as any)
                    }}>
                    <option>ResNet50</option>
                    <option>MobileNetV1</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  outputStride
                </td>
                <td>
                  <select
                    defaultValue={get().outputStride}
                    title='okej'
                    onChange={(e) => {
                      const v = Number(e.target.value)
                      handleUpdate('outputStride', v as any)
                    }}>
                    <option style={get().architecture == 'ResNet50' ? { display: `none` } : undefined} >8</option>
                    <option>16</option>
                    <option style={get().architecture == 'MobileNetV1' ? { display: `none` } : undefined}>32</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  quantBytes
                </td>
                <td>
                  <select
                    defaultValue={get().quantBytes} onChange={(e) => {
                      const v = Number(e.target.value)
                      handleUpdate('quantBytes', v as any)
                    }}>
                    <option>1</option>
                    <option>2</option>
                    <option>4</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  internalResolution
                </td>
                <td>


                  <select
                    defaultValue={get().internalResolution} onChange={(e) => {
                      const v = e.target.value
                      handleUpdate('internalResolution', v as any)
                    }}>
                    <option>low</option>
                    <option>medium</option>

                    <option>high</option>
                    <option>full</option>
                  </select>

                </td>
              </tr>
              <tr>
                <td>
                  segmentationThreshold
                </td>
                <td>

                  <input
                    defaultValue={get().segmentationThreshold} type={"number"} min={0} max={1} step={0.05} placeholder='segmentationThreshold'
                    onChange={(e) => {
                      const v = Number(e.target.value)
                      handleUpdate(`segmentationThreshold`, v as any)
                    }}></input>

                </td>
              </tr>
            </tbody>
          </table>



        </div>
        <div style={{
          display: `flex`,
          justifyContent: `center`
        }}>
          <Button variant='contained' style={isBackgroundProcessed ? { display: 'none' } : undefined} onClick={backgroundRemoval}> usuń tło </Button>
          {/* <button style={restoreBaseImg ? undefined : { display: 'none' }} onClick={downloadProcessedImg}> pobierz </button> */}
          <Button variant='contained' color='success' style={isBackgroundProcessed ? undefined : { display: 'none' }} onClick={resetCanvas}> resetuj </Button>
          <Button variant='contained' color='success' style={isBackgroundProcessed ? undefined : { display: 'none' }} onClick={downloadImg}> pobierz </Button>


        </div >
      </div>


      {/* <ImageBlackboard /> */}


    </div>
  )
}

export default RemoveBackground