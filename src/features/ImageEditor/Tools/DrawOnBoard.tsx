
import React, { useContext, useEffect, useRef, useState } from 'react'
import { ImageEditorContext } from '../ImageEditor'

type Point = { x: number, y: number }

const DrawOnBoard = () => {
  const { canvas, canvasContext } = useContext(ImageEditorContext)
  const lastPointPos = useRef<Point>()
  const isDrawing = useRef<boolean>(false)


  useEffect(() => {
    canvas.current?.addEventListener('mousemove', (it) => { showCords(it); })
    canvas.current?.addEventListener('mouseup', () => { isDrawing.current = (false); lastPointPos.current = undefined })
    canvas.current?.addEventListener('mousedown', () => { isDrawing.current = (true) })
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
    <div>
      <button onClick={() => { console.log('trzeba zaladowac plik') }} > zaladuj plik z pamieci </button>


    </div >

  )
}

export default DrawOnBoard