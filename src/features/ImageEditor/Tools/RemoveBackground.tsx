
import React, { useContext, useEffect, useRef, useState } from 'react'
import { ImageEditorContext } from '../ImageEditor'
import * as bodyPix from '@tensorflow-models/body-pix'
import imageCompression from 'browser-image-compression'

import * as tf from '@tensorflow/tfjs';
import ImageBlackboard from '../ImageBlackboard';

const RemoveBackground = () => {
  const ctx = useContext(ImageEditorContext)
  const canvasRef = useRef<HTMLCanvasElement>()
  const [isProcessed, setIsProcessed] = useState(false)

  useEffect(() => {
    tf.setBackend('cpu')
    if (canvasRef.current != undefined) {
      // const cvs = canvasRef.current
      // const ctx2d = cvs.getContext('2d')

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

  const downloadProcessedImg = async () => {
    if (!canvasRef.current) return
    // const { width, height } = canvasRef.current
    // const ctx2d = canvasRef.current.getContext('2d')
    const processedCtx = canvasRef.current


    // const cleanedImgFile = await imageCompression.getFilefromDataUrl(processedCtx.toDataURL(), '')

    // const [imgEle, offsetCanvas] = await imageCompression.drawFileInCanvas(cleanedImgFile)


    // ctx.canvasContext.current?.drawImage(offsetCanvas, 0, 0, width, height)

    // console.log("DONE !")
    // ctx.setOriginalFile(cleanedImgFile)

    const aEle = document.createElement('a')
    aEle.href = processedCtx.toDataURL()
    aEle.download = ctx.fileName ?? "output.png"
    aEle.click()
    return

    // ctx2d?.drawImage()
    // ctx.canvasContext.current?.drawImage(ctx2d)
    // const processedImg = ctx2d?.getImageData(0, 0, width, height)

    // ctx.canvasContext.current?.drawImage(processedImg, 0, 0)
    // window.URL.createObjectURL(processedImg)


    // TODO: set as ctx.processedFile
    // then, display btn download under img
    // 
  }


  const backgroundRemoval = async () => {
    setIsProcessed(true)

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
          <canvas ref={canvasRef as any} />
        </div>
        <div style={{
          display: `flex`,
          justifyContent: `center`
        }}>
          <button style={isProcessed ? { display: 'none' } : undefined} onClick={backgroundRemoval}> usuń tło </button>
          <button style={isProcessed ? undefined : { display: 'none' }} onClick={downloadProcessedImg}> pobierz </button>
        </div >
      </div>


      {/* <ImageBlackboard /> */}


    </div>
  )
}

export default RemoveBackground