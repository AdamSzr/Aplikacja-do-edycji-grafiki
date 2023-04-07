import React, { createContext } from 'react'
import imageCompression, { Options } from 'browser-image-compression';
import { useEffect, useRef, useState } from 'react'
import NavMenu, { ToolType } from './NavMenu';
import ImageBlackboard from './ImageBlackboard';
import { createUseStyles } from 'react-jss';
import { BACKGROUND } from '../theme/colors';
import ContentContainer from '../ContentContainer/ContentContainer';
import DownloadBtn from '../DownloadBtn';

export type CanvasSize = { w: number, h: number }
export type ActiveFile = "original" | 'processed' | undefined
export type ImageEditorContextType = {
    originalFile: File | null,
    processedFile: File | null,
    setProcessedFile: (file: File | null) => void,
    setOriginalFile: (file: File | null) => void
    activeFile: ActiveFile | null,
    canvasSize: CanvasSize | null
    setCanvasSize: (size: CanvasSize | null) => void
    setActiveFile: (active: ActiveFile | null) => void
    canvas: React.MutableRefObject<HTMLCanvasElement | null | undefined>
    canvasContext: React.MutableRefObject<CanvasRenderingContext2D | null | undefined>,
    fileName: string | null,
    setFileName: (fileName: string | null) => void
    setTool: (tool: JSX.Element | null) => void
    toolName: ToolType | null
    setToolName: (name: ToolType) => void
}

export const ImageEditorContext = createContext<ImageEditorContextType>({} as ImageEditorContextType)

const ImageEditor = () => {
    const [originalFile, setOriginalFile] = useState<File | null>(null)
    const [processedFile, setProcessedFile] = useState<File | null>(null)
    const [activeFile, setActiveFile] = useState<ActiveFile | null>(null)
    const [toolName, setToolName] = useState<ToolType | null>(null)
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const canvasContextRef = useRef<CanvasRenderingContext2D | null>(null)
    const [fileName, setFileName] = useState<string | null>(null)
    const [canvasSize, setCanvasSize] = useState<{ w: number, h: number } | null>({ w: 200, h: 200 })
    const [tool, setTool] = useState<JSX.Element | null>(null)
    const style = useStyles()


    useEffect(() => {
        if (canvasRef.current != null) {
            canvasContextRef.current = canvasRef.current.getContext('2d')
        }
    }, [canvasRef.current])


    const contextValue: ImageEditorContextType = {
        activeFile,
        setCanvasSize: (size) => setCanvasSize(size),
        canvasSize,
        originalFile,
        processedFile,
        setProcessedFile: (file: File | null) => setProcessedFile(file),
        setOriginalFile: (file: File | null) => setOriginalFile(file),
        setActiveFile: (active: ActiveFile | null) => setActiveFile(active),
        canvas: canvasRef,
        canvasContext: canvasContextRef,
        fileName,
        setFileName: (fileName: string | null) => setFileName(fileName),
        setTool: (tool: JSX.Element | null) => setTool(tool),
        toolName,
        setToolName,
    }

    console.log({ activeFile, canvasSize, ref: canvasRef.current, fileName, originalFile, processedFile })

    return (
        <ImageEditorContext.Provider value={contextValue} >
            <div className={style.layoutStyle + ' layout'}>
                <DownloadBtn />

                <ContentContainer>
                    <NavMenu />
                </ContentContainer>

                {tool &&
                    <ContentContainer>
                        {tool}
                    </ContentContainer>
                }


                <ImageBlackboard />
            </div>
        </ImageEditorContext.Provider>
    )
}

export default ImageEditor



const useStyles = createUseStyles((theme) => {
    return ({
        layoutStyle: {
            backgroundColor: BACKGROUND.secondaryLight
        }
    })
});
