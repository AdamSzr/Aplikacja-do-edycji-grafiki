import { Button, IconButton, createStyles } from '@mui/material'
import React, { useContext } from 'react'
import { ImageEditorContext } from './ImageEditor'
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { BACKGROUND } from '../theme/colors';
import { ToolType } from './NavMenu';

const DownloadBtn = () => {

    const ctx = useContext(ImageEditorContext)

    const hideWhenView: ToolType[] = [] //['background-remove']

    const shouldHide = ctx.toolName ? hideWhenView.includes(ctx.toolName) : true


    const downloadClicked = () => {
        if (ctx.canvasContext.current) {
            console.log(ctx.activeFile)
            // return
            window.URL.createObjectURL((ctx.activeFile == 'original' ? ctx.originalFile : ctx.processedFile)!)
            // const file = ctx.canvas.current?.toDataURL()! 
            //window.URL.createObjectURL((ctx.activeFile == 'original' ? ctx.originalFile : ctx.processedFile)!)
            //ctx.canvas.current?.toDataURL()! //window.URL.createObjectURL(ctx.processedFile ?? ctx.originalFile!) // ctx.canvas.current!.toDataURL(`png`)
            const aEle = document.createElement('a')
            aEle.href = window.URL.createObjectURL((ctx.activeFile == 'original' ? ctx.originalFile : ctx.processedFile)!)
            aEle.download = ctx.fileName ?? "output.png"
            aEle.click()
            return
        }
        else {
            console.log({ canvasCtx: ctx.canvasContext.current })
        }



    }

    return (
        <span style={shouldHide ? { display: "none" } : undefined}>
            <IconButton onClick={downloadClicked} style={{ position: `fixed`, top: "20px", right: '20px', backgroundColor: BACKGROUND.accentGreen }}><DownloadForOfflineIcon /></IconButton>
        </ span>
    )
}

export default DownloadBtn

