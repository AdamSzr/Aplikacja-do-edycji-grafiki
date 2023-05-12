import { Box, Button, Paper, Typography } from '@mui/material'
import imageCompression, { Options } from 'browser-image-compression'
import React, { useContext } from 'react'
import { createUseStyles } from 'react-jss'
import { ImageEditorContext } from './ImageEditor'
import CanvasResize from './Tools/CanvasResize'
import CompressImageTool from './Tools/CompressImageTool'
import { DiffComponent } from './Tools/DiffComponent'
import DrawOnBoard from './Tools/DrawOnBoard'
import RemoveBackground from './Tools/RemoveBackground'
import { BACKGROUND } from '../theme/colors'


export type ToolType = "img-resize" | "compression" | "draw" | "background-remove" | 'diff' | "view"

const NavMenu = () => {
    const ctx = useContext(ImageEditorContext)

    const style = useStyles()

    const onFileInputChange = async (e: any) => {
        const imageFile = e.target.files[0];
        ctx.setOriginalFile(imageFile)
        const [htmlImageElement, canvas] = await imageCompression.drawFileInCanvas(imageFile)
        setTimeout(() => {
            ctx.canvasContext.current?.drawImage(htmlImageElement, 0, 0)
        }, 100)
        ctx.setFileName(imageFile.name)
        ctx.setCanvasSize({ w: canvas.width, h: canvas.height })
        ctx.setActiveFile('original')
        ctx.setToolName('view')
        ctx.setPageName(`Edytujesz ${imageFile.name}`)
    }



    const clearData = () => {
        ctx.setActiveFile(null)
        ctx.setCanvasSize(null)
        ctx.setOriginalFile(null)
        ctx.setProcessedFile(null)
        ctx.setTool(null)
        ctx.setFileName(null)
        ctx.setToolName(null)
    }



    return (
        <>
            <nav className={style.navMenu}>
                {!ctx.originalFile && <input type='file' onChange={onFileInputChange} />}

                <Button onClick={() => { ctx.setTool(<DrawOnBoard />); ctx.setToolName('draw') }} > rysuj </Button>
                {
                    ctx.originalFile && <>
                        <Button onClick={() => { ctx.setTool(<CompressImageTool />); ctx.setToolName('compression') }}> kompresja </Button>
                        <Button onClick={() => { ctx.setTool(<RemoveBackground />); ctx.setToolName('background-remove') }}> usuwanie tla </Button>
                        <Button onClick={() => { ctx.setTool(< CanvasResize />); ctx.setToolName('img-resize') }} > zmiana rozmiaru</Button>
                        <Button onClick={clearData} >Wyczyść dane</Button>
                    </>
                }
                {ctx.processedFile && <>
                    {/* <Button onClick={() => { ctx.setTool(<DiffComponent />);; ctx.setToolName('diff') }}>diff</Button> */}
                    <Button onClick={clearData} >Wyczyść dane</Button>
                </>
                }
            </nav>
        </>
    )
}

export default NavMenu

const useStyles = createUseStyles((theme) => {
    return ({
        navMenu: {
            marginBottom: '10px',
            backgroundColor: BACKGROUND.secondary,
            minHeight: "50px",
            borderRadius: "0px 0px 20px 20px",
            display: 'flex',
            alignItems: `center`,
            justifyContent: `center`,
        },
        fileName: {
            textAlign: 'center'
        }
    })
});
