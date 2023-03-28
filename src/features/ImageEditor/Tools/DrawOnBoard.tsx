
import React, { useContext, useEffect, useRef, useState } from 'react'
import ImageBlackboard from '../ImageBlackboard'
import { ImageEditorContext } from '../ImageEditor'

type Point = { x: number, y: number }

const DrawOnBoard = () => {
  const { canvas, canvasContext } = useContext(ImageEditorContext)
  const lastPointPos = useRef<Point>()
  const isDrawing = useRef<boolean>(false)


  useEffect(() => {
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
    <div>
      <button onClick={() => { console.log('trzeba zaladowac plik') }} > zaladuj plik z pamieci </button>
    </div >

  )
}

export default DrawOnBoard