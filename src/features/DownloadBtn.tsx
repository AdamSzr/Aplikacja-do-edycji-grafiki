import { Button, IconButton, createStyles } from '@mui/material'
import React, { useContext } from 'react'
import { ImageEditorContext } from './ImageEditor/ImageEditor'
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { BACKGROUND } from './theme/colors';

const DownloadBtn = () => {

    const ctx = useContext(ImageEditorContext)

    const downloadClicked = () => {

        console.log(`download`)
        if (ctx.canvasContext.current) {
            // window.URL.createObjectURL(ctx.processedFile ?? ctx.originalFile!)
            // ctx.canvas.current?.toDataURL()
            console.log(ctx.activeFile)
            // return
            // window.URL.createObjectURL((ctx.activeFile == 'original' ? ctx.originalFile : ctx.processedFile)!)
            const file = ctx.canvas.current?.toDataURL()!  //window.URL.createObjectURL((ctx.activeFile == 'original' ? ctx.originalFile : ctx.processedFile)!)
            //ctx.canvas.current?.toDataURL()! //window.URL.createObjectURL(ctx.processedFile ?? ctx.originalFile!) // ctx.canvas.current!.toDataURL(`png`)
            const aEle = document.createElement('a')
            aEle.href = file
            aEle.download = ctx.fileName ?? "output.png"
            aEle.click()
            return
        }
        else {
            console.log({ canvasCtx: ctx.canvasContext.current })
        }



    }

    return (
        <>
            <IconButton onClick={downloadClicked} style={{ position: `fixed`, top: "20px", right: '20px', backgroundColor: BACKGROUND.accentGreen }}><DownloadForOfflineIcon /></IconButton>
        </>
    )
}

export default DownloadBtn

