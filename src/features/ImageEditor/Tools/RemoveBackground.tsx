
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

    // if (restoreBaseImg == true) {
    //   resetCanvas()
    // }
  }, [get()])

  useEffect(() => {
    tf.setBackend('cpu')
    if (canvasRef.current != undefined) {
      const cvs = canvasRef.current
      const ctx2d = cvs.getContext('2d')

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
    // setRestoreBaseImg(false)
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


  }, [restoreBaseImg])



  const backgroundRemoval = async () => {
    if (!canvasRef || !canvasRef.current)
      return
    const canvas = canvasRef.current

    const net = await bodyPix.load({
      architecture: 'MobileNetV1', //ResNet50
      outputStride: 16,
      quantBytes: 1
    })
    const segmentation = await net.segmentPerson(canvas, {
      internalResolution: 'medium',
      segmentationThreshold: 0.7,
      //   scoreTreshold: 0.7
    })

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