
import React, { useContext, useEffect, useRef, useState } from 'react'
import { ImageEditorContext } from '../ImageEditor'
import * as bodyPix from '@tensorflow-models/body-pix'
import imageCompression from 'browser-image-compression'

import * as tf from '@tensorflow/tfjs';
import ImageBlackboard from '../ImageBlackboard';

const RemoveBackground = () => {
  const ctx = useContext(ImageEditorContext)
  const canvasRef = useRef<HTMLCanvasElement>()

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

    // tf.ready().then(_ =>{
    // })

  }, [])


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
    <div>RemoveBackground

      <canvas ref={canvasRef as any} />
      {/* <ImageBlackboard /> */}
      <button onClick={backgroundRemoval} > remove </button>

    </div>
  )
}

export default RemoveBackground