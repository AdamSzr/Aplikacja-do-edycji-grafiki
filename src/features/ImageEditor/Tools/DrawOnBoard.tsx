
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import BlackboardImage from '../BlackboardImage'
import { ImageEditorContext } from '../ImageEditor'
import imageCompression from 'browser-image-compression'
import { IconButton } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import RectangleIcon from '@mui/icons-material/Rectangle';


type Point = { x: number, y: number }
export type DrawTool = "pen" | "circle" | "rectangle"


const DrawOnBoard = () => {
  const ctx = useContext(ImageEditorContext)
  const { canvas, canvasContext } = ctx
  const lastPointPos = useRef<Point>()
  const isDrawing = useRef<boolean>(false)
  const [drawTool, setDrawTool] = useState<DrawTool | null>(null)

  const originalFile = useMemo(() => {
    if (ctx.originalFile) {
      return new File([ctx.originalFile!], 'copy.jpg')
    }
  }, [])

  // [originalFile, setOriginalFile] = useState<File | null>(null)


  // useEffect(() => {
  //   if (ctx.originalFile && !originalFile) {
  //     const fileCpy = new File([ctx.originalFile!], 'copy.jpg')
  //     setOriginalFile(fileCpy)
  //     console.log("made cpy")
  //   }
  // }, [])

  const cleanCanvas = () => {
    console.log(ctx)
    if (!originalFile) return

    imageCompression.drawFileInCanvas(originalFile)
      .then(
        ([imgEle, offsetCanvas]) => {
          const baseCtx = ctx.canvasContext.current
          console.log(`drawing ${ctx.activeFile}`)
          const sizes = { w: imgEle.width, h: imgEle.height }
          ctx.setCanvasSize(sizes)
          // baseCtx?.clearRect(0, 0, sizes.w, sizes.h)

          setTimeout(() => {
            baseCtx?.drawImage(offsetCanvas, 0, 0)
          }, 200);

        }
      )
    // ctx.canvasContext.current?.clearRect(0, 0, ctx.canvasSize!.w, ctx.canvasSize!.h)
  }

  const drawRectangleEffect = () => {
    const onMouseUp = ({ offsetX, offsetY }: MouseEvent) => {
      if (!lastPointPos.current) return

      isDrawing.current = (false);
      const ctx = canvasContext.current!
      const { x, y } = lastPointPos.current

      console.log('up', { offsetX, offsetY })
      ctx.beginPath();
      ctx.rect(x, y, offsetX - x, offsetY - y);
      ctx.stroke();
      lastPointPos.current = undefined
    }
    const onMouseDown = ({ offsetX, offsetY }: MouseEvent) => {
      lastPointPos.current = { x: offsetX, y: offsetY }
      console.log('down', { offsetX, offsetY })
      isDrawing.current = (true);
    }
    canvas.current?.addEventListener('mouseup', onMouseUp)
    canvas.current?.addEventListener('mousedown', onMouseDown)

    return () => {
      canvas.current?.removeEventListener('mouseup', onMouseUp)
      canvas.current?.removeEventListener('mousedown', onMouseDown)
    }
  }

  const drawCircleEffect = () => {
    const onMouseUp = ({ offsetX, offsetY }: MouseEvent) => {
      if (!lastPointPos.current) return

      isDrawing.current = (false);
      const ctx = canvasContext.current!
      const { x, y } = lastPointPos.current

      console.log('up', { offsetX, offsetY })
      const calcCenter = () => {
        const xAxes = (offsetX + x) / 2
        const yAxes = (offsetY + y) / 2
        const radius = Math.abs(offsetX - xAxes)
        return [xAxes, yAxes, radius]
      }
      const [centerX, centerY, radius] = calcCenter()
      ctx.beginPath();

      console.log([centerX, centerY, radius, 0, 2 * Math.PI])
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
      ctx.stroke();
      lastPointPos.current = undefined
    }
    const onMouseDown = ({ offsetX, offsetY }: MouseEvent) => {
      lastPointPos.current = { x: offsetX, y: offsetY }
      console.log('down', { offsetX, offsetY })
      isDrawing.current = (true);
    }
    canvas.current?.addEventListener('mouseup', onMouseUp)
    canvas.current?.addEventListener('mousedown', onMouseDown)

    return () => {
      canvas.current?.removeEventListener('mouseup', onMouseUp)
      canvas.current?.removeEventListener('mousedown', onMouseDown)
    }
  }

  const drawLineEffect = () => {
    const onMuseMove = (it: MouseEvent) => { drawLine(it) }
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
  }


  useEffect(() => {

    imageCompression.canvasToFile(canvas.current!, '', '', 1).then(file => {
      ctx.setOriginalFile(file)
      ctx.setActiveFile('original')
    })

    if (drawTool == 'pen') {
      return drawLineEffect()
    }
    if (drawTool == 'rectangle') {
      console.log('drawingRectangle')
      return drawRectangleEffect()
    }
    if (drawTool == 'circle') {
      console.log('circle')
      return drawCircleEffect()
    }

  }, [drawTool])


  const setToolPen = () => {
    setDrawTool('pen')
    console.log(`setting - pen`)
  }

  const rectangle = () => {
    setDrawTool('rectangle')
    console.log(`setting - rectangle`)
  }


  const circle = () => {
    setDrawTool('circle')
    console.log(`setting - circle`)
  }

  useEffect(() => {
    ctx.setToolboxItems(<>
      <IconButton onClick={cleanCanvas}> <CleaningServicesIcon fontSize="inherit" /></IconButton>
      <IconButton onClick={setToolPen} > <CreateIcon fontSize="inherit" /> </IconButton>
      <IconButton onClick={rectangle} > <RectangleIcon fontSize="inherit" /> </IconButton>
      <IconButton onClick={circle}> <Brightness1Icon fontSize="inherit" /> </IconButton>
      <input type="color" id="head" name="head" value="#000" />
    </>)
  }, [])



  // const onColorChange

  function drawLine({ offsetX, offsetY }: MouseEvent) {
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