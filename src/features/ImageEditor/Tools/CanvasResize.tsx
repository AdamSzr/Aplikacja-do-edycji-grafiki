
import { Slider } from '@mui/material'
import { useContext } from 'react'
import { ImageEditorContext } from '../ImageEditor'


export type SliderEventValue = { value: number, name?: string }

const CanvasResize = () => {
    const ctx = useContext(ImageEditorContext)


    const handleSliderChange = (event: Event) => {
        const { value, name } = event.target as unknown as SliderEventValue
        if (name == "width-slider") {
            const newSize = { width: value, height: ctx.canvasSize?.height ?? 0 }
            ctx.setCanvasSize(newSize)
        }
        if (name == "height-slider") {
            const newSize = { width: ctx.canvasSize?.width ?? 0, height: value }
            ctx.setCanvasSize(newSize)
        }
    }


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