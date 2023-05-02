import imageCompression from 'browser-image-compression'
import React, { PropsWithChildren, useContext, useEffect, useRef, useState } from 'react'
import { ImageEditorContext } from '../ImageEditor'
import parseSizeToHumanReadable from '@/src/utils/parseSizeToHumanReadable'

export const DiffComponent = () => {

    return <>diff component</>

    const ctx = useContext(ImageEditorContext)
    const [element, setElement] = useState<null | JSX.Element>()
    const orginalRef = useRef<HTMLCanvasElement>()
    const processedRef = useRef<HTMLCanvasElement>()
    const [oimgElement, setOImgElement] = useState<JSX.Element | null>(<div> 1234</div>)

    const [pimgElement, setPImgElement] = useState<HTMLImageElement | null>()

    useEffect(() => {

        const promiseTable = [imageCompression.drawFileInCanvas(ctx.originalFile!), imageCompression.drawFileInCanvas(ctx.processedFile!)]

        ctx.canvas.current!.style.display = "none"

        console.log("hide")
        Promise.all(promiseTable).then((e) => {
            const oryginalImg = e.at(0)!
            const processedImg = e.at(1)!
            console.log({ orginalImg: oryginalImg, processedImg })

            if (!window) return

            // const imgOryginal = document.createElement('img')
            // oryginalImg?.[1].getContext(`2d`)?.drawImage(imgOryginal, oryginalImg[0].width, oryginalImg?.[0].height)
            // setOImgElement(imgOryginal)
            // console.log(imgOryginal, typeof imgOryginal)
            // const procImg = document.createElement('img')
            // processedImg?.[1].getContext(`2d`)?.drawImage(procImg, processedImg[0].width, processedImg?.[0].height)
            // setPImgElement(procImg)

            // setOImgElement(orginalImg.at(0) ?? null)
            // setPImgElement(setPImgElement)
            const orgImgBitmap: ImageBitmap = (oryginalImg[0] as ImageBitmap)
            const procImgBitmap: ImageBitmap = (processedImg[0] as ImageBitmap)


            orginalRef.current?.getContext(`2d`)?.drawImage(orgImgBitmap, 0, 0)
            processedRef.current?.getContext(`2d`)?.drawImage(procImgBitmap, 0, 0)
            console.log({ processedImg, pp: procImgBitmap, oi: orgImgBitmap })

        })
        return () => {
            console.log("unset")
            ctx.canvas.current!.style.display = "block"
        }


    }, [])

    const ImageContainer = ({ children }: PropsWithChildren) => {
        return <div style={{
            display: `flex`,
            // width: `50%`,
            flexDirection: `column`

        }}>
            {children}
        </div>
    }

    return (
        <div style={{ display: 'grid', gridTemplateColumns: "1fr 1fr", gridGap: '10px' }}>
            <ImageContainer>
                <h2> Oryginalny obraz {parseSizeToHumanReadable(ctx.originalFile?.size ?? 0)}</h2>
                {/* {oimgElement} */}
                <canvas ref={orginalRef as any} width={ctx.canvasSize?.width} style={{ aspectRatio: 'auto', width: '100%' }} height={ctx.canvasSize?.height} />
            </ImageContainer>
            <ImageContainer>

                <h2 > Skompresowany o obraz  {parseSizeToHumanReadable(ctx.processedFile?.size ?? 0)}</h2>
                <canvas ref={processedRef as any} width={ctx.canvasSize?.width} style={{ aspectRatio: 'auto', width: '100%' }} height={ctx.canvasSize?.height} />
            </ImageContainer>
        </div>
    )
}
