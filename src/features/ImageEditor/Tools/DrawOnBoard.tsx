
import React, { ChangeEvent, ChangeEventHandler, useContext, useEffect, useMemo, useRef, useState } from 'react'
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
export type DrawOptions = { color: string, lineWidth: number }

const DrawOnBoard = () => {
  const imgEditorCtx = useContext(ImageEditorContext)
  const { canvas, canvasContext } = imgEditorCtx
  const lastPointPos = useRef<Point>()
  const isDrawing = useRef<boolean>(false)
  const [drawTool, setDrawTool] = useState<DrawTool | null>(null)
  const [drawOptions, setDrawOptions] = useState<DrawOptions>({ color: '#295432', lineWidth: 1 })


  const originalFile = useMemo(() => {
    if (imgEditorCtx.originalFile) {
      console.log("update of originalFile")
      return new File([imgEditorCtx.originalFile!], 'copy.jpg')
    }
  }, [])


  const cleanCanvas = () => {
    console.log(imgEditorCtx)
    if (!originalFile) return

    imageCompression.drawFileInCanvas(originalFile)
      .then(
        ([imgEle, offsetCanvas]) => {
          const bbCtx = imgEditorCtx.canvasContext.current
          setTimeout(() => {
            bbCtx?.drawImage(imgEle, 0, 0)
          }, 200);

        }
      )
  }

  const drawRectangleEffect = () => {
    const onMouseUp = ({ offsetX, offsetY }: MouseEvent) => {
      if (!lastPointPos.current) return

      isDrawing.current = (false);
      const ctx = canvasContext.current!
      const { x, y } = lastPointPos.current

      console.log('up', { offsetX, offsetY })
      ctx.beginPath();

      ctx.lineWidth = drawOptions.lineWidth
      ctx.strokeStyle = drawOptions.color
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

      const calcCenter = () => {
        const xAxes = (offsetX + x) / 2
        const yAxes = (offsetY + y) / 2
        const radius = Math.abs(offsetX - xAxes)
        return [xAxes, yAxes, radius]
      }
      const [centerX, centerY, radius] = calcCenter()
      ctx.beginPath();

      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
      ctx.lineWidth = drawOptions.lineWidth
      ctx.strokeStyle = drawOptions.color
      ctx.stroke();
      lastPointPos.current = undefined
    }

    const onMouseDown = ({ offsetX, offsetY }: MouseEvent) => {
      lastPointPos.current = { x: offsetX, y: offsetY }
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
    if (!canvas.current) {
      console.log("canvas-not-initialized")
      return
    }

    if (drawTool == 'pen') {
      return drawLineEffect()
    }
    if (drawTool == 'rectangle') {
      return drawRectangleEffect()
    }
    if (drawTool == 'circle') {
      return drawCircleEffect()
    }

  }, [drawTool, drawOptions])


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
    imgEditorCtx.setToolboxItems(<>
      <IconButton onClick={cleanCanvas}> <CleaningServicesIcon fontSize="inherit" /></IconButton>
      <IconButton onClick={setToolPen} > <CreateIcon fontSize="inherit" /> </IconButton>
      <IconButton onClick={rectangle} > <RectangleIcon fontSize="inherit" /> </IconButton>
      <IconButton onClick={circle}> <Brightness1Icon fontSize="inherit" /> </IconButton>
      <input onChange={onColorChange} type="color" defaultValue={drawOptions.color} />
      <input type='number' onChange={onLineWidthChange} defaultValue={drawOptions.lineWidth} min={1} />
    </>)
  }, [])


  const onLineWidthChange = (e: any) => {
    const lineWidth = Number(e.target.value)
    setDrawOptions(it => ({ ...it, lineWidth }))
  }

  const onColorChange = (e: any) => {
    const color = e.target.value as string
    setDrawOptions(it => ({ ...it, color }))
  }

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

    canvasContext.current.lineWidth = drawOptions.lineWidth
    canvasContext.current.strokeStyle = drawOptions.color

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