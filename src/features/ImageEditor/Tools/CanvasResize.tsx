
import { Slider } from '@mui/material'
import React, { useContext } from 'react'
import ImageBlackboard from '../ImageBlackboard'
import { ImageEditorContext } from '../ImageEditor'


export type SliderEventValue = { value: number, name?: string }

const CanvasResize = () => {
    const ctx = useContext(ImageEditorContext)

    const handleSliderChange = (event: Event) => { // MouseEvent
        // console.log({ event, tg: event.target })
        const { value, name } = event.target as unknown as SliderEventValue
        // if (name == "width-slider") {
        //     const newSize = { w: value, h: ctx.canvasSize?.h ?? 0 }
        //     ctx.setCanvasSize(newSize)
        // }
        // if (name == "height-slider") {
        //     const newSize = { w: ctx.canvasSize?.w ?? 0, h: value }
        //     ctx.setCanvasSize(newSize)
        // }
    }


    return (
        <div>
            <div>CanvasResize with aspect ratio</div>
            <Slider min={100} name="width-slider" onChange={handleSliderChange} max={750} > szerokość</Slider>
            <Slider min={100} name="height-slider" onChange={handleSliderChange} max={750}> długość</Slider>
        </div >
    )
}

export default CanvasResize