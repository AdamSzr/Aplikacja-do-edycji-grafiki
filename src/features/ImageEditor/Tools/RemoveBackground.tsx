
import * as bodyPix from '@tensorflow-models/body-pix';
import imageCompression from 'browser-image-compression';
import { useContext, useEffect, useState } from 'react';
import { ImageEditorContext, ImageEditorContextType } from '../ImageEditor';

import defaultMlConfig from '@/src/utils/defaultMlConfig';
import { Button } from '@mui/material';
import * as tf from '@tensorflow/tfjs';
import useFormFieldsUpdater from '../../objectUpdater';



const RemoveBackground = () => {
  const ctx = useContext<ImageEditorContextType>(ImageEditorContext)
  const canvasRef = ctx.canvas
  const [isBackgroundProcessed, setIsBackgroundProcessed] = useState(false)

  const [handleUpdate, get] = useFormFieldsUpdater(defaultMlConfig())


  useEffect(() => {

    if (isBackgroundProcessed == true) {
      resetCanvas()
    }
  }, [get()])

  useEffect(() => {
    tf.setBackend('cpu')
    if (canvasRef.current != undefined) {

      imageCompression.drawFileInCanvas(ctx.originalFile!)
        .then(
          ([imgEle, offsetCanvas]) => {
            const baseCtx = canvasRef.current?.getContext(`2d`)
            console.log('drawing original')
            const sizes = { w: imgEle.width, h: imgEle.height }
            console.log({ sizes })
            canvasRef.current!.width = sizes.w
            canvasRef.current!.height = sizes.h
            ctx.setCanvasSize(sizes)
            baseCtx?.clearRect(0, 0, sizes.w, sizes.h)

            setTimeout(() => {
              baseCtx?.drawImage(imgEle, 0, 0)
            }, 200);

          }
        )
    }

  }, [])


  const resetCanvas = () => {
    setIsBackgroundProcessed(false)
    imageCompression.drawFileInCanvas(ctx.originalFile!)
      .then(
        ([imgEle, offsetCanvas]) => {
          const baseCtx = canvasRef.current?.getContext(`2d`)
          console.log('drawing original')
          const sizes = { w: imgEle.width, h: imgEle.height }
          console.log({ sizes })
          canvasRef.current!.width = sizes.w
          canvasRef.current!.height = sizes.h
          ctx.setCanvasSize(sizes)

          setTimeout(() => {

            baseCtx?.drawImage(imgEle, 0, 0)
          }, 200);

        }
      )
  }



  const backgroundRemoval = async () => {
    if (!canvasRef || !canvasRef.current)
      return
    const canvas = canvasRef.current

    const net = await bodyPix.load(get())
    const segmentation = await net.segmentPerson(canvas, get())

    const ctx = canvas.getContext('2d')!
    const { data: imgData } = ctx.getImageData(0, 0, canvas.width, canvas.height)

    const newImg = ctx.createImageData(canvas.width, canvas.height)
    const newImgData = newImg.data

    segmentation.data.forEach((segment, i) => {
      if (segment == 1) {
        newImgData[i * 4] = imgData[i * 4]
        newImgData[i * 4 + 1] = imgData[i * 4 + 1]
        newImgData[i * 4 + 2] = imgData[i * 4 + 2]
        newImgData[i * 4 + 3] = imgData[i * 4 + 3]
      }
    })

    ctx.putImageData(newImg, 0, 0)
    setIsBackgroundProcessed(true)
  }


  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ margin: "0 auto" }}>
          <canvas ref={canvasRef as any} height={ctx.canvasSize?.h} width={ctx.canvasSize?.w} />
        </div>
        <div style={{
          display: `flex`,
          justifyContent: `center`
        }}>
          <table style={{ borderSpacing: `10px` }}>
            <thead>
              <tr style={{ fontWeight: '700' }}> <td>opcja</td><td>ustawienia</td></tr>
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

        </div >
      </div>


      {/* <ImageBlackboard /> */}


    </div>
  )
}

export default RemoveBackground