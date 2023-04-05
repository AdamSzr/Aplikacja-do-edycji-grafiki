import { Button, createStyles } from '@mui/material'
import React, { useContext } from 'react'
import { ImageEditorContext } from './ImageEditor/ImageEditor'



const DownloadBtn = () => {

    const ctx = useContext(ImageEditorContext)

    const downloadClicked = () => {
        if (ctx.canvasContext.current) {
            window.URL.createObjectURL(ctx.processedFile!)
            const file = window.URL.createObjectURL(ctx.processedFile!) // ctx.canvas.current!.toDataURL(`png`)
            const aEle = document.createElement('a')
            aEle.href = file
            aEle.download = ctx.fileName ?? "output.png"
            aEle.click()
            return
        }

  

        console.log(`download`)
    }

    return (
        <>
            <Button variant='contained' color='secondary' style={{ position: `fixed`, top: "100px", right: '100px' }} onClick={downloadClicked}>Pobierz</Button>
        </>
    )
}

export default DownloadBtn
