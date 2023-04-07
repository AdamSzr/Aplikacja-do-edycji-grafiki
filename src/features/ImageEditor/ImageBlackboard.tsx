
import imageCompression from 'browser-image-compression'
import React, { useContext, useEffect } from 'react'
import { createUseStyles } from 'react-jss'
import { ImageEditorContext } from './ImageEditor'
import { IconButton } from '@mui/material'
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import { ToolType } from './NavMenu'

const ImageBlackboard = () => {
    const style = useStyles()
    const ctx = useContext(ImageEditorContext)
    const hideWhenView: ToolType[] = ['background-remove']

    const shouldHide = ctx.toolName ? hideWhenView.includes(ctx.toolName) : true

    useEffect(() => {
        console.log("loading - image")
        if (ctx.originalFile == undefined)
            return

        const showOriginal = ctx.activeFile == 'original'

        imageCompression.drawFileInCanvas(showOriginal ? ctx.originalFile! : ctx.processedFile!)
            .then(
                ([imgEle, offsetCanvas]) => {
                    const baseCtx = ctx.canvasContext.current
                    console.log(`drawing ${ctx.activeFile}`)
                    const sizes = { w: imgEle.width, h: imgEle.height }
                    ctx.setCanvasSize(sizes)
                    baseCtx?.clearRect(0, 0, sizes.w, sizes.h)

                    setTimeout(() => {
                        baseCtx?.drawImage(offsetCanvas, 0, 0)
                    }, 200);

                }
            )

    }, [ctx.activeFile])



    const cleanCanvas = () => {
        ctx.canvasContext.current?.clearRect(0, 0, ctx.canvasSize!.w, ctx.canvasSize!.h)
    }



    return (
        <div className={style.imageBoard} style={shouldHide ? { display: "none" } : undefined}>
            <div style={{ display: 'flex' }}>
                <canvas width={ctx.canvasSize?.w} height={ctx.canvasSize?.h} style={{ border: '2px solid black', aspectRatio: 'auto', maxWidth: '100%' }} ref={ctx.canvas as any} />
                <div >
                    <IconButton onClick={cleanCanvas}> <CleaningServicesIcon fontSize="inherit" /></IconButton>
                </div>
            </div>
        </div>
    )
}

export default ImageBlackboard


const useStyles = createUseStyles((theme) => {
    return ({
        imageBoard: {
            display: `flex`,
            justifyContent: 'center',
            maxWidth: "1080px",
            margin: '0 auto'
        }
    })
});
