
import React, { useContext, useEffect, useRef, useState } from 'react'
import BlackboardImage from '../BlackboardImage'
import { ImageEditorContext } from '../ImageEditor'
import imageCompression from 'browser-image-compression'

type Point = { x: number, y: number }

const DrawOnBoard = () => {
  const ctx = useContext(ImageEditorContext)
  const { canvas, canvasContext } = ctx
  const lastPointPos = useRef<Point>()
  const isDrawing = useRef<boolean>(false)


  useEffect(() => {

    imageCompression.canvasToFile(canvas.current!, '', '', 1).then(file => {
      ctx.setOriginalFile(file)
      ctx.setActiveFile('original')
    })
    // URL.createObjectURL(await imageCompression.canvasToFile(canvas.current))

    const onMuseMove = (it: MouseEvent) => { showCords(it) }
    const onMouseUp = () => { isDrawing.current = (false); lastPointPos.current = undefined }
    const onMouseDown = () => { isDrawing.current = (true) }
    canvas.current?.addEventListener('mousemove', onMuseMove)
    canvas.current?.addEventListener('mouseup', onMouseUp)
    canvas.current?.addEventListener('mousedown', onMouseDown)
    return () => {

      canvas.current?.removeEventListener('mousemove', onMuseMove)
      canvas.current?.removeEventListener('mouseup', onMouseUp)
      canvas.current?.removeEventListener('mousedown', onMouseDown)

    }
  }, [])



  function showCords({ offsetX, offsetY }: MouseEvent) {
    if (!isDrawing.current || !canvasContext.current)
      return

    const point: Point = { x: offsetX, y: offsetY }

    if (lastPointPos.current == undefined) {
      lastPointPos.current = point
      return
    }

    const prevPoint = lastPointPos.current
    canvasContext.current.beginPath()
    canvasContext.current.moveTo(prevPoint.x, prevPoint.y);
    canvasContext.current.lineTo(point.x, point.y);
    canvasContext.current.stroke();

    lastPointPos.current = point
  }


  return (
    <></>
  )
}

export default DrawOnBoard