import { Box, Button, Paper, Typography } from '@mui/material'
import imageCompression, { Options } from 'browser-image-compression'
import React, { useContext } from 'react'
import { createUseStyles } from 'react-jss'
import { BACKGROUND } from '../theme/colors'
import { ImageEditorContext } from './ImageEditor'
import CompressImageTool from './Tools/CompressImageTool'
import { DiffComponent } from './Tools/DiffComponent'
import DrawOnBoard from './Tools/DrawOnBoard'
import RemoveBackground from './Tools/RemoveBackground'

const NavMenu = () => {
    const ctx = useContext(ImageEditorContext)

    const style = useStyles()

    const onFileInputChange = async (e: any) => {
        const imageFile = e.target.files[0];
        ctx.setOriginalFile(imageFile)
        const [htmlImageElement, canvas] = await imageCompression.drawFileInCanvas(imageFile)
        // await Promise.resolve(() => ctx.canvasContext.current?.drawImage(htmlImageElement, 0, 0))
        setTimeout(() => {
            ctx.canvasContext.current?.drawImage(htmlImageElement, 0, 0)
        }, 100)
        ctx.setFileName(imageFile.name)
        ctx.setCanvasSize({ w: canvas.width, h: canvas.height })
        ctx.setActiveFile('original')
    }

    const downloadFile = () => {
        if (!ctx.processedFile) return
        const a = document.createElement("a")
        a.href = URL.createObjectURL(ctx.processedFile)
        a.download = `${ctx.fileName}.jpg`
        a.click()
    }

    const showDiffrence = async () => {
        ctx.setActiveFile(ctx.activeFile == 'original' ? 'processed' : 'original')
    }

    const onDownloadClick = () => {
        downloadFile()
    }

    const clearData = () => {
        ctx.setActiveFile(null)
        ctx.setCanvasSize(null)
        ctx.setOriginalFile(null)
        ctx.setProcessedFile(null)
        ctx.setTool(null)
        ctx.setFileName(null)
    }



    return (
        <>
            <nav className={style.navMenu}>
                {!ctx.originalFile && <input type='file' onChange={onFileInputChange} />}

                <Button onClick={() => ctx.setTool(<DrawOnBoard />)} > Paint </Button>
                {
                    ctx.originalFile && <>
                        <Button onClick={() => ctx.setTool(<CompressImageTool />)}> kompresja </Button>
                        <Button onClick={() => ctx.setTool(<RemoveBackground />)}> usuwanie tla </Button>
                        <Button onClick={clearData} >Wyczyść dane</Button>
                    </>
                }
                {ctx.processedFile && <>
                    <Button onClick={() => ctx.setTool(<DiffComponent />)}>diff</Button>
                    <Button onClick={onDownloadClick}>download</Button>
                    <Button onClick={clearData} >Wyczyść dane</Button>
                </>
                }
            </nav>
            {ctx.originalFile && <Box>
                <Typography className={style.fileName}>
                    {`Edytujesz własnie`} <b>{ctx.fileName}</b>
                </Typography>
            </Box>}
        </>
    )
}

export default NavMenu

const useStyles = createUseStyles((theme) => {
    return ({
        navMenu: {
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
