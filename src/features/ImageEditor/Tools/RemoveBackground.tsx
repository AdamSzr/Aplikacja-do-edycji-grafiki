
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

    // if (!ctx.canvasContext.current)
    //   return

    // const secCanv = document.createElement('canvas')
    // secCanv.height = ctx.canvasSize?.w!
    // secCanv.width = ctx.canvasSize?.h!
    // var secCtx = secCanv.getContext('2d');
    // secCtx?.drawImage(ctx.canvas.current!, ctx.canvasSize?.w!, ctx.canvasSize?.h!)


    // // const imgCpyData = ctx.canvasContext.current?.canvas.toDataURL()
    // const toProcessImg = secCtx?.getImageData(0, 0, ctx.canvasSize?.w!, ctx.canvasSize?.h!)!
    // ctx.canvasContext.current!.getImageData(0, 0, ctx.canvasSize?.w!, ctx.canvasSize?.h!)
    // console.log(imgCpyData)
    // var image = new Image();
    // image.src = imgCpyData!
    // image.width = ctx.canvasSize?.w!
    // image.height = ctx.canvasSize?.h!
    // console.log({ image })

    // const imageCopy = imageCompression.drawImageInCanvas(image)
    // const cpyCanvas = imageCopy!
    // const copyImgCtx = cpyCanvas.getContext('2d')!
    // const imgData = copyImgCtx.getImageData(0, 0, cpyCanvas.width, cpyCanvas.height).data

    // let newImg = copyImgCtx.createImageData(cpyCanvas.width, cpyCanvas.height)
    // newImg = ctx.canvasContext.current.getImageData(0, 0, ctx.canvasSize?.w!, ctx.canvasSize?.h!)
    const blackBoardCanvas = ctx.canvas.current!
    const blackBoardCtx = ctx.canvasContext.current!
    const net = await bodyPix.load(get())
    const segmentation = await net.segmentPerson(blackBoardCanvas, get())
    const segmentedImgData = blackBoardCtx.getImageData(0, 0, ctx.canvasSize?.w!, ctx.canvasSize?.h!)
    const segmentedBytes = segmentedImgData.data
    const newImgData = blackBoardCtx.createImageData(blackBoardCanvas.width, blackBoardCanvas.height).data

    // let newImgData = ctx.canvasContext.current.getImageData(0, 0, ctx.canvasSize?.w!, ctx.canvasSize?.h!).data


    segmentation.data.forEach((segment, i) => {
      if (segment == 1) {
        newImgData[i * 4] = segmentedBytes[i * 4]
        newImgData[i * 4 + 1] = segmentedBytes[i * 4 + 1]
        newImgData[i * 4 + 2] = segmentedBytes[i * 4 + 2]
        newImgData[i * 4 + 3] = segmentedBytes[i * 4 + 3]
      }
    })
    const compareBytes = () => {
      const oldData = segmentedImgData
      if (newImgData.length == segmentedBytes.length)
        console.log(`same same`)

      for (let x = 0; x < newImgData.length / 1000; x++) {
        if (newImgData[x] != segmentedBytes[x])
          console.log(`DIFF ${x}`, newImgData[x], segmentedBytes[x])

      }

    }

    compareBytes()
    // newImgData
    canvasRef.current?.getContext('2d')?.drawImage(blackBoardCanvas, ctx.canvasSize?.w!, ctx.canvasSize?.h!)
    // console.log({ newImgData })
    // ctx.canvasContext.current.clearRect(0, 0, ctx.canvasSize?.w!, ctx.canvasSize?.h!)
    // ctx.canvasContext.current.drawImage(secCanv, ctx.canvasSize?.w!, ctx.canvasSize?.h!)
    blackBoardCtx.putImageData(segmentedImgData, 0, 0)
    // ctx.canvasContext.current!.putImageData(new ImageData(newImgData, ctx.canvasSize?.w!, ctx.canvasSize?.h!), 0, 0)
    // console.log({ ctx })
  }


  return (
    <div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ margin: "0 auto" }}>
          <canvas ref={canvasRef as any} />
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