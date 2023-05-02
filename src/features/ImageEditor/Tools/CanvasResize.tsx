
import { Slider } from '@mui/material'
import imageCompression from 'browser-image-compression'
import { useContext, useState } from 'react'
import { ImageEditorContext } from '../ImageEditor'


export type SliderEventValue = { value: number, name?: string }

const CanvasResize = () => {
    const ctx = useContext(ImageEditorContext)

    const handleSliderChange = (event: Event) => {
        console.log({ event, tg: event.target })
        const { value, name } = event.target as unknown as SliderEventValue
        if (name == "width-slider") {
            const newSize = { width: value, height: ctx.canvasSize?.height ?? 0 }
            ctx.setCanvasSize(newSize)
        }
        if (name == "height-slider") {
            const newSize = { width: ctx.canvasSize?.width ?? 0, height: value }
            ctx.setCanvasSize(newSize)
        }
        // draw()
    }

    const draw = async () => {
        console.log("draw")
        const [canv, image] = await imageCompression.drawFileInCanvas(ctx.activeFile == 'original' ? ctx.originalFile! : ctx.processedFile!)
        ctx.canvasContext.current?.drawImage(image, 0, 0, ctx.canvasSize!.width, ctx.canvasSize!.height)
    }

    console.log(ctx.canvasSize)

    return (
        <div>
            <div>
                Szerokość
                <Slider min={1} name="width-slider" defaultValue={ctx.canvasSize?.width} valueLabelDisplay='on' onChange={handleSliderChange} max={1920} > szerokość</Slider>
                Wysokość
                <Slider min={1} name="height-slider" defaultValue={ctx.canvasSize?.height} valueLabelDisplay='on' onChange={handleSliderChange} max={1080}> długość</Slider>
            </div>
        </div >
    )
}

export default CanvasResize