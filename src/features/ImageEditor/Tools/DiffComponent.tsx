import imageCompression from 'browser-image-compression'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { ImageEditorContext } from '../ImageEditor'

export const DiffComponent = () => {
    const ctx = useContext(ImageEditorContext)
    const [element, setElement] = useState<null | JSX.Element>()
    const orginalRef = useRef<HTMLCanvasElement>()
    const processedRef = useRef<HTMLCanvasElement>()


    useEffect(() => {
        const promiseTable = [imageCompression.drawFileInCanvas(ctx.originalFile!), imageCompression.drawFileInCanvas(ctx.processedFile!)]

        Promise.all(promiseTable).then((e) => {
            const orginalImg = e.at(0)
            const processedImg = e.at(1)
            const orgImgBitmap:ImageBitmap= (orginalImg!.at(0) as ImageBitmap)

            const procImgBitmap:ImageBitmap= (processedImg!.at(0) as ImageBitmap)
            orginalRef.current?.getContext(`2d`)?.drawImage(orgImgBitmap, 0, 0)
            processedRef.current?.getContext(`2d`)?.drawImage(procImgBitmap, 0, 0)
            console.log({ processedImg, pp: orginalImg!.at(0), orginalImg, oi: orginalImg!.at(0), e })
            // setElement(<>
            // {(orginalImg?.[1] as unknown as OffscreenCanvas).getContext('2d')}
            // {(processedImg?.[1] as unknown as OffscreenCanvas).getContext('2d')}
            // </>)
        })

    }, [])


    return (
        <div>
            <canvas ref={orginalRef as any} width={ctx.canvasSize?.w} height={ctx.canvasSize?.h} />
            <canvas ref={processedRef as any} width={ctx.canvasSize?.w} height={ctx.canvasSize?.h} />
        </div>
    )
}
