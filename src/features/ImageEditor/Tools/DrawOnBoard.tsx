
import React, { useContext, useEffect, useRef, useState } from 'react'
import { ImageEditorContext } from '../ImageEditor'

type Point = { x: number, y: number }

const DrawOnBoard = () => {
  const ctx = useContext(ImageEditorContext)
  const canvasRef = useRef<HTMLCanvasElement>()
  const [canvasCtx, setCanvasCtx] = useState<CanvasRenderingContext2D>()
  const [lastPos, setLastPos] = useState<null | Point>()

  function showCords(e: MouseEvent) {
    const pos: Point = { x: e.clientX, y: e.clientY }
    // console.log(canvasCtx, e, pos)
    // if (!canvasCtx) return

    console.log(lastPos, pos)

    if (!lastPos) {
      setLastPos(pos)
      return
    }


    if (lastPos) {
      canvasCtx!.beginPath();
      canvasCtx!.moveTo(lastPos.x, lastPos.y);
      canvasCtx!.lineTo(pos.x, pos.y);
      canvasCtx!.stroke();
      setLastPos(pos)
    } 
  }

  useEffect(() => {
    if (canvasRef.current) {
      const board = canvasRef.current
      const ctx2D = canvasRef.current!.getContext(`2d`)!

      setCanvasCtx(ctx2D)
      board.addEventListener("mousemove", (e) => showCords(e));
      board.addEventListener("mousedown", (e) => showCords(e));
      board.addEventListener("mouseup", (e) => showCords(e));
      board.addEventListener("mouseout", (e) => showCords(e));
    } else {
      console.log("WAIT - canvas not loaded")
    }
  }, [])


  return (
    <div>
      <button onClick={() => { console.log('trzeba zaladowac plik') }} > zaladuj plik z pamieci </button>
      <canvas ref={canvasRef as any} width={500} height={500} style={{ border: '1px solid black' }}>

      </canvas>

    </div>

  )
}

export default DrawOnBoard