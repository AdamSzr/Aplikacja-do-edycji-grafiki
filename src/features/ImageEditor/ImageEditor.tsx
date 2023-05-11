import React, { createContext } from 'react'
import imageCompression, { Options } from 'browser-image-compression';
import { useEffect, useRef, useState } from 'react'
import NavMenu, { ToolType } from './NavMenu';
import BlackboardImage from './BlackboardImage';
import { createUseStyles } from 'react-jss';
import { BACKGROUND } from '../theme/colors';
import ContentContainer from '../../components/ContentContainer/ContentContainer';
import DownloadBtn from './DownloadBtn';
import Head from 'next/head';
import { AppConfig } from '@/src/config';
import { useRouter } from 'next/router';

export type CanvasSize = { width: number, height: number }
export type ActiveFile = "original" | 'processed' | undefined
export type ImageEditorContextType = {
    setPageName: (newName: string) => void,
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
    setToolName: (name: ToolType | null) => void
    toolboxItems: JSX.Element | null
    setToolboxItems: (elements: JSX.Element | null) => void

}

export const ImageEditorContext = createContext<ImageEditorContextType>({} as ImageEditorContextType)

const ImageEditor = () => {
    const r = useRouter()
    const isBgRemove = r.asPath.includes(`background-remove`) ? true : false

    const [pageName, setPageName] = useState<string>("Prymitywny edytor zdjęć")
    const [originalFile, setOriginalFile] = useState<File | null>(null)
    const [processedFile, setProcessedFile] = useState<File | null>(null)
    const [activeFile, setActiveFile] = useState<ActiveFile | null>(null)
    const [toolName, setToolName] = useState<ToolType | null>(isBgRemove ? 'background-remove' : null)
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const canvasContextRef = useRef<CanvasRenderingContext2D | null>(null)
    const [fileName, setFileName] = useState<string | null>(null)
    const [canvasSize, setCanvasSize] = useState<CanvasSize | null>(null)
    const [tool, setTool] = useState<JSX.Element | null>(null)
    const [toolboxItems, setToolboxItems] = useState<JSX.Element | null>(null)
    const style = useStyles()

    const loadPersonImg = async () => {
        let response = await fetch('/person.jpg')
        let data = await response.blob();
        let file = new File([data], "/person.jpg");

        imageCompression.drawFileInCanvas(file).then(([img, canv]) => {
            const { width, height } = img
            setCanvasSize({ width, height })
            setActiveFile('original')
            setToolName(isBgRemove ? "background-remove" : 'view')
            setOriginalFile(file)
        })
    }

    useEffect(() => {
        if (canvasRef.current != null && canvasContextRef.current == null)
            canvasContextRef.current = canvasRef.current.getContext('2d')

        if (AppConfig.isDevMode && !originalFile)
            loadPersonImg().then()

    }, [canvasRef.current])


    const contextValue: ImageEditorContextType = {
        setPageName: (name) => setPageName(name),
        activeFile,
        setCanvasSize: (size) => { console.log(`settingSize -> [${size}]`); setCanvasSize(size) },
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
        toolboxItems,
        setToolboxItems,

    }

    console.log({ contextValue })

    return (
        <ImageEditorContext.Provider value={contextValue} >
            <Head>
                <title>
                    {pageName}
                </title>
            </Head>
            <div className={style.layoutStyle + ' layout'}>
                <DownloadBtn />

                <ContentContainer>
                    <NavMenu />
                </ContentContainer>

                {
                    <ContentContainer>
                        {tool}
                    </ContentContainer>
                }


                <BlackboardImage />
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
