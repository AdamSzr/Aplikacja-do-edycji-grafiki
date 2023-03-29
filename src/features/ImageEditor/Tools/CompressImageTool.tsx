import { Button, LinearProgress, Slider, Typography } from '@mui/material';
import imageCompression, { Options } from 'browser-image-compression';
import React, { useContext, useState } from 'react'
import ImageBlackboard from '../ImageBlackboard';
import { ImageEditorContext } from '../ImageEditor';
import FileSizeDisplay from './FileSizeDisplay';
import LinearProgressWithLabel from './LinearProgressWithLabel';

const CompressImageTool = () => {
    const oneMb = 1_000_000
    const ctx = useContext(ImageEditorContext)
    const [compressionProgress, setCompressionProgress] = useState<number>(0)
    const [inProgress, setInProgress] = useState<boolean>(false)
    const [compressOpt, setCompressOpt] = useState<Options>({
        // maxSizeMB: (ctx.originalFile?.size ?? 0) / oneMb,
        // maxWidthOrHeight: 500,
        maxSizeMB: Infinity,
        useWebWorker: true,
        alwaysKeepResolution: true,
        maxIteration: 1000,
        onProgress: (e) => {
            setCompressionProgress(e)
            if (e == 100)
                setInProgress(false)
        }

    })


    const compressionStrength = (procentage: number) => {

        console.log({ procentage, originalSiz: ctx.originalFile?.size, expectedSiz: (ctx.originalFile?.size ?? 0) * (0.01 * procentage) / oneMb })
        setCompressOpt(acc => {
            const nv = ({ ...acc, maxSizeMB: (ctx.originalFile?.size ?? 0) * (0.01 * procentage) / oneMb })
            return nv
        })
    }

    const compressFile = async (imageFile: File, options: Options = compressOpt) => {
        const compressedFile = await imageCompression(imageFile, options);

        // console.log('compressedFile instanceof Blob', compressedFile instanceof Blob, options); // true
        // console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
        return compressedFile
    }


    const onCompressClick = async () => {
        if (!ctx.originalFile) return
        setInProgress(true)
        const compressed = await compressFile(ctx.originalFile)
        ctx.setProcessedFile(compressed)
    }


    return (
        <div>

            <div>
                stopien kompresji
                <Slider
                    size="small"
                    max={100}
                    min={30}
                    disabled={inProgress}
                    defaultValue={70}
                    aria-label="Small"
                    valueLabelDisplay="on"
                    valueLabelFormat={(value) => `${value}%`}
                    onChange={(e) => compressionStrength(Number((e.target as any).value))}

                />
            </div>
            {inProgress == true && <LinearProgressWithLabel value={compressionProgress} />}
            <FileSizeDisplay />
            <FileSizeDisplay text='Oczekiwana wielość pliku: ' value={(compressOpt.maxSizeMB ?? 0) * 1_000_000} />
            <FileSizeDisplay text="Skompresowany plik waży:" forFile='processed' />
            <Button disabled={inProgress} onClick={onCompressClick}>
                start
            </Button>

            {
                ctx.processedFile && <>
                    <Button disabled={ctx.activeFile == 'original'} onClick={() => { ctx.setActiveFile('original') }} >
                        pokaż oryginalne zdjęcie
                    </Button>
                    <Button disabled={ctx.activeFile == 'processed'} onClick={() => { ctx.setActiveFile('processed') }}>
                        pokaż skompresowane zdjęcie
                    </Button>
                </>
            }
        </div>
    )
}

export default CompressImageTool