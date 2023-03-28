import { Button, LinearProgress, Slider, Typography } from '@mui/material';
import imageCompression, { Options } from 'browser-image-compression';
import React, { useContext, useState } from 'react'
import ImageBlackboard from '../ImageBlackboard';
import { ImageEditorContext } from '../ImageEditor';
import FileSizeDisplay from './FileSizeDisplay';
import LinearProgressWithLabel from './LinearProgressWithLabel';

const CompressImageTool = () => {
    const oneMb = 1048576
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
        console.log((ctx.originalFile?.size ?? 0) * (0.01 * procentage) / oneMb)
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
                    min={60}
                    defaultValue={70}
                    aria-label="Small"
                    valueLabelDisplay="on"
                    onChange={(e) => compressionStrength(Number((e.target as any).value))}

                />
            </div>
            {inProgress == true && <LinearProgressWithLabel value={compressionProgress} />}
            <Typography>
                CompressImageTool</Typography>
            <FileSizeDisplay />            <FileSizeDisplay forFile='processed' />
            <FileSizeDisplay value={(compressOpt.maxSizeMB ?? 0) * 1_000_000} />
            <Button onClick={onCompressClick}>
                start
            </Button>
        </div>
    )
}

export default CompressImageTool