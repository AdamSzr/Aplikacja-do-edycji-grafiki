
import React, { useContext, useEffect, useRef, useState } from 'react'
import { ImageEditorContext, ImageEditorContextType } from '../ImageEditor'
import * as bodyPix from '@tensorflow-models/body-pix'
import imageCompression from 'browser-image-compression'

import * as tf from '@tensorflow/tfjs';
import BlackboardImage from '../BlackboardImage';
import { ModelConfig, PersonInferenceConfig } from '@tensorflow-models/body-pix/dist/body_pix_model';
import useFormFieldsUpdater from '../../objectUpdater';
import { Button } from '@mui/material';


type MlSettings = PersonInferenceConfig & ModelConfig

const RemoveBackground = () => {
  const ctx = useContext<ImageEditorContextType>(ImageEditorContext)
  const canvasRef = ctx.canvas
  // const [isProcessed, setIsProcessed] = useState(false)
  const [restoreBaseImg, setRestoreBaseImg] = useState(false)

  const [handleUpdate, get] = useFormFieldsUpdater({
    architecture: 'MobileNetV1',
    outputStride: 16,
    quantBytes: 1,
    internalResolution: 'medium',
    segmentationThreshold: 0.4
  } as MlSettings)

  useEffect(() => {

    if (restoreBaseImg == true) {
      // setRestoreBaseImg(it => !it)
      resetCanvas()
    }
  }, [get()])

  useEffect(() => {

    // imageCompression.canvasToFile(ctx.canvas.current!, '', '', 1).then(file => {
    //   ctx.setOriginalFile(file)
    //   ctx.setActiveFile('original')
    // })
    // URL.createObjectURL(await imageCompression.canvasToFile(canvas.current))

  }, [])


  const resetCanvas = () => {
    setRestoreBaseImg(false)
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


  useEffect(() => {
    tf.setBackend('cpu')
    // if (canvasRef.current != undefined) {

    //   imageCompression.drawFileInCanvas(ctx.originalFile!)
    //     .then(
    //       ([imgEle, offsetCanvas]) => {
    //         const baseCtx = canvasRef.current?.getContext(`2d`)
    //         console.log('drawing original')
    //         const sizes = { w: imgEle.width, h: imgEle.height }
    //         console.log({ sizes })
    //         canvasRef.current!.width = sizes.w
    //         canvasRef.current!.height = sizes.h
    //         ctx.setCanvasSize(sizes)
    //         baseCtx?.clearRect(0, 0, sizes.w, sizes.h)

    //         setTimeout(() => {

    //           baseCtx?.drawImage(imgEle, 0, 0)
    //         }, 200);

    //       }
    //     )
    // }

  }, [restoreBaseImg])

  // const downloadProcessedImg = async () => {
  //   // if (!ctx.canvas.current) return

  //   // const processedCtx = canvasRef.current


  //   // const aEle = document.createElement('a')
  //   // aEle.href = processedCtx.toDataURL()
  //   // aEle.download = ctx.fileName ?? "output.png"
  //   // aEle.click()
  //   // return
  // }


  const backgroundRemoval = async () => {
    setRestoreBaseImg(false)


    if (!canvasRef.current)
      return

    const canvas = canvasRef.current

    const net = await bodyPix.load(get())
    const segmentation = await net.segmentPerson(canvas, get())
    const blackboardCtx = ctx.canvasContext.current!
    const { data: imgData } = blackboardCtx.getImageData(0, 0, canvas.width, canvas.height)

    const newImg = blackboardCtx.createImageData(canvas.width, canvas.height)
    const newImgData = newImg.data

    segmentation.data.forEach((segment, i) => {
      if (segment == 1) {
        newImgData[i * 4] = imgData[i * 4]
        newImgData[i * 4 + 1] = imgData[i * 4 + 1]
        newImgData[i * 4 + 2] = imgData[i * 4 + 2]
        newImgData[i * 4 + 3] = imgData[i * 4 + 3]
      }
    })

    setRestoreBaseImg(true)
    blackboardCtx.putImageData(newImg, 0, 0)
  }


  return (
    <div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ margin: "0 auto" }}>
          {/* <canvas ref={canvasRef as any} /> */}
        </div>
        <div style={{
          display: `flex`,
          justifyContent: `center`
        }}>
          <table style={{ borderSpacing: `10px` }}>
            <tr style={{ fontWeight: '700' }}> <td>opcja</td><td>ustawienia</td></tr>
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
          </table>







        </div>
        <div style={{
          display: `flex`,
          justifyContent: `center`
        }}>
          <Button variant='contained' style={restoreBaseImg ? { display: 'none' } : undefined} onClick={backgroundRemoval}> usuń tło </Button>
          {/* <button style={restoreBaseImg ? undefined : { display: 'none' }} onClick={downloadProcessedImg}> pobierz </button> */}
          <Button variant='contained' color='success' style={restoreBaseImg ? undefined : { display: 'none' }} onClick={resetCanvas}> resetuj </Button>

        </div >
      </div>


      {/* <ImageBlackboard /> */}


    </div>
  )
}

export default RemoveBackground