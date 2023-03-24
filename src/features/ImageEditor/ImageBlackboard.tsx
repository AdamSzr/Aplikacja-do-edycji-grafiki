
import imageCompression from 'browser-image-compression'
import React, { useContext, useEffect } from 'react'
import { createUseStyles } from 'react-jss'
import { ImageEditorContext } from './ImageEditor'



const ImageBlackboard = () => {
    const style = useStyles()
    const ctx = useContext(ImageEditorContext)

    useEffect(() => {
        console.log("loading - image")
        if (ctx.originalFile == undefined)
            return

        const showOriginal = ctx.activeFile == 'original'

        imageCompression.drawFileInCanvas(showOriginal ? ctx.originalFile! : ctx.processedFile!)
            .then(
                ([imgEle, offsetCanvas]) => {
                    const canvas = ctx.canvas
                    const baseCtx = canvas.current?.getContext(`2d`)
                    console.log('drawing original')
                    const sizes = { w: imgEle.width, h: imgEle.height }
                    ctx.setCanvasSize(sizes)
                    baseCtx?.clearRect(0, 0, sizes.w, sizes.h)

                    setTimeout(() => {
                        baseCtx?.drawImage(imgEle, 0, 0)
                    }, 200);

                }
            )

    }, [ctx.activeFile])





    return (
        <div className={style.imageBoard}>
            <canvas width={ctx.canvasSize?.w} height={ctx.canvasSize?.h} style={{ border: '2px solid black', display: !ctx.originalFile ? "none" : "unset" }} ref={ctx.canvas as any} />
        </div>
    )
}

export default ImageBlackboard


const useStyles = createUseStyles((theme) => {
    return ({
        imageBoard: {
            display:`flex`,
            justifyContent:'center'
        }
    })
});
