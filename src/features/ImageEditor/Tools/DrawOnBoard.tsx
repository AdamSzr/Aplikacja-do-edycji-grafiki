
import React, { useContext, useEffect, useRef, useState } from 'react'
import { ImageEditorContext } from '../ImageEditor'

type Point = { x: number, y: number }

const DrawOnBoard = () => {
  const ctx = useContext(ImageEditorContext)
  const [isDrawing, setIsDrawing] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement>()
  const canvasCtxRef = useRef<CanvasRenderingContext2D>()
  const lastPointPos = useRef<Point>()

  function showCords({ offsetX, offsetY }: MouseEvent) {
    if (!isDrawing || !canvasCtxRef.current)
      return

    const point: Point = { x: offsetX, y: offsetY }


    if (lastPointPos.current == undefined) {
      lastPointPos.current = point
      return
    }

    const prevPoint = lastPointPos.current



    canvasCtxRef.current.beginPath()
    canvasCtxRef.current.moveTo(prevPoint.x, prevPoint.y);
    canvasCtxRef.current.lineTo(point.x, point.y);
    canvasCtxRef.current.stroke();

    lastPointPos.current = point
  }




  useEffect(() => {
    if (canvasRef.current) {
      const ctx2D = canvasRef.current!.getContext(`2d`)!
      canvasCtxRef.current = ctx2D
    } else {
      console.log("WAIT - canvas not loaded")
    }
  }, [])


  return (
    <div>
      <button onClick={() => { console.log('trzeba zaladowac plik') }} > zaladuj plik z pamieci </button>
      <canvas
        onMouseDown={e => setIsDrawing(true)}
        onMouseMove={e => showCords(e.nativeEvent)}
        onMouseUp={e => {
          console.log("Mouse up")
          setIsDrawing(false);
          lastPointPos.current = undefined
        }}
        ref={canvasRef as any} width={500} height={500} style={{ border: '1px solid black' }}>

      </canvas>

    </div>

  )
}

export default DrawOnBoard