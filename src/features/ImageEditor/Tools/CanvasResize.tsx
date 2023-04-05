
import { Button, Slider } from '@mui/material'
import React, { useContext, useState } from 'react'
import ImageBlackboard from '../ImageBlackboard'
import { ImageEditorContext } from '../ImageEditor'
import CompressImageTool from './CompressImageTool'
import imageCompression from 'browser-image-compression'


export type SliderEventValue = { value: number, name?: string }

const CanvasResize = () => {
    const ctx = useContext(ImageEditorContext)
    const [oryginalSize, setOryginalSize] = useState(ctx.canvasSize)

    const handleSliderChange = (event: Event) => { // MouseEvent
        console.log({ event, tg: event.target })
        const { value, name } = event.target as unknown as SliderEventValue
        if (name == "width-slider") {
            const newSize = { w: value, h: ctx.canvasSize?.h ?? 0 }
            ctx.setCanvasSize(newSize)
        }
        if (name == "height-slider") {
            const newSize = { w: ctx.canvasSize?.w ?? 0, h: value }
            ctx.setCanvasSize(newSize)
        }
        draw()
    }

    const draw = async () => {
        console.log("draw")
        const [canv, image] = await imageCompression.drawFileInCanvas(ctx.activeFile == 'original' ? ctx.originalFile! : ctx.processedFile!)
        ctx.canvasContext.current?.drawImage(image, 0, 0, ctx.canvasSize!.w, ctx.canvasSize!.h)
        // ctx.canvasContext.current?.drawImage(ctx.activeFile == "original" ? imageCompression.drawFileInCanvas(ctx.originalFile) : ctx.processedFile)
    }


    return (
        <div>
            <div>CanvasResize with aspect ratio</div>
            <Button onClick={draw} > rysuj </Button>
            <Slider min={100} name="width-slider" defaultValue={oryginalSize?.w} valueLabelDisplay='on' onChange={handleSliderChange} max={1920} > szerokość</Slider>
            <Slider min={100} name="height-slider" defaultValue={oryginalSize?.h} valueLabelDisplay='on' onChange={handleSliderChange} max={1080}> długość</Slider>
        </div >
    )
}

export default CanvasResize