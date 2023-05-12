
import imageCompression from 'browser-image-compression'
import { useContext, useEffect } from 'react'
import { createUseStyles } from 'react-jss'
import { ImageEditorContext, ImageEditorContextType } from './ImageEditor'
import { ToolType } from './NavMenu'
import { Padding } from '@mui/icons-material'

const BlackboardImage = () => {
    const style = useStyles()
    const imgEditorContext = useContext<ImageEditorContextType>(ImageEditorContext)
    const hideWhenView: ToolType[] = ['background-remove']//['background-remove']

    const shouldHide = imgEditorContext.toolName ? hideWhenView.includes(imgEditorContext.toolName) : true
    useEffect(() =>{
       reloadCanvasImage()
    },[imgEditorContext.activeFile])

    useEffect(() => {
        reloadCanvasImage()
    }, [imgEditorContext.canvasSize || imgEditorContext.originalFile ])


    const reloadCanvasImage = () =>{
        if (!imgEditorContext.activeFile) return
        if (!imgEditorContext.canvasSize) return

        const fileToShow = imgEditorContext.activeFile == 'original' ? imgEditorContext.originalFile : imgEditorContext.processedFile

        if (!fileToShow) throw Error(" wrong file selected")
        imageCompression
            .drawFileInCanvas(fileToShow)
            .then(
                ([imgEle, offsetCanvas]) => {
                    const bbCtx = imgEditorContext.canvasContext.current
                    const { width, height } = imgEditorContext.canvasSize!

                    setTimeout(() => {
                        bbCtx?.drawImage(imgEle, 0, 0, width, height)
                    }, 200);

                }
            )

    }

    return (
        <div className={style.imageBoard} style={shouldHide ? { display: "none" } : undefined}>
            <div >
                <div className={style.toolbox} style={imgEditorContext.toolName == 'draw' ? undefined : { display: 'none' }}>
                    {imgEditorContext.toolboxItems}
                </div>
                <canvas width={imgEditorContext.canvasSize?.width} height={imgEditorContext.canvasSize?.height} style={{ border: '2px solid black', aspectRatio: 'auto', maxWidth: '100%' }} ref={imgEditorContext.canvas as any} />

            </div>
        </div>
    )
}

export default BlackboardImage


const useStyles = createUseStyles((theme) => {
    return ({
        imageBoard: {
            display: `flex`,
            justifyContent: 'center',
            maxWidth: "1080px",
            margin: '0 auto',
            padding: '5px'
        },
        toolbox: {
            display: 'flex',
            flexDirection: 'row'
        }
    })
});
