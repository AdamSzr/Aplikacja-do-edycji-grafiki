import { Button, IconButton, createStyles } from '@mui/material'
import React, { useContext } from 'react'
import { ImageEditorContext } from './ImageEditor'
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { BACKGROUND } from '../theme/colors';
import { ToolType } from './NavMenu';

const DownloadBtn = () => {

    const ctx = useContext(ImageEditorContext)
    const tool = ctx.toolName
    const hideWhenView: ToolType[] = ['background-remove'] //['background-remove']

    const shouldHide = ctx.toolName ? hideWhenView.includes(ctx.toolName) : true
    const downloadCanvasImgInViews = ['draw', 'img-resize', 'compression'] as ToolType[]

    const downloadClicked = () => {
        const sholudDownloadCanvas = downloadCanvasImgInViews.some(it => it == tool)
        const aEle = document.createElement('a')
        console.log({ sholudDownloadCanvas })
        let hrefUrl
        if (sholudDownloadCanvas) {
            if (tool == 'compression')
                hrefUrl = window.URL.createObjectURL((ctx.activeFile == 'original' ? ctx.originalFile : ctx.processedFile)!)
            else
                hrefUrl = ctx.canvas.current?.toDataURL()!
        }
        else
            hrefUrl = window.URL.createObjectURL((ctx.activeFile == 'original' ? ctx.originalFile : ctx.processedFile)!)

        aEle.href = hrefUrl
        aEle.download = ctx.fileName ?? "output.png"
        aEle.click()
        return
    }

    return (
        <span style={shouldHide ? { display: "none" } : undefined}>
            <IconButton onClick={downloadClicked} style={{ position: `fixed`, top: "20px", right: '20px', backgroundColor: BACKGROUND.accentGreen }}><DownloadForOfflineIcon /></IconButton>
        </ span>
    )
}

export default DownloadBtn

