import { Button, LinearProgress, Slider, Typography } from '@mui/material';
import imageCompression, { Options } from 'browser-image-compression';
import React, { useContext, useState } from 'react'
import { ImageEditorContext } from '../ImageEditor';
import FileSizeDisplay from './FileSizeDisplay';
import LinearProgressWithLabel from './LinearProgressWithLabel';
import parseSizeToHumanReadable from '@/src/utils/parseSizeToHumanReadable';

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
            console.log({ progress: e })
            if (e == 100)
                setInProgress(false)
        }

    })


    const compressionStrength = (procentage: number) => {

        console.log({ procentage, originalSiz: ctx.originalFile?.size, expectedSiz: (ctx.originalFile?.size ?? 0) * (0.01 * procentage) })
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
        console.log({ compressed })

    }
    console.log(ctx.originalFile?.size, ctx.processedFile?.size)

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
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* display: flex;
    flex-direction: column;
    align-items: center; */}
                <table style={{
                    // margin: `0 auto`
                }} >
                    <th>
                        <td>plik</td>
                        <td>rozmiar pliku</td>
                    </th>
                    <tr>
                        <td>oryginalny</td>
                        <td>{parseSizeToHumanReadable(ctx.originalFile?.size ?? 0)}</td>
                    </tr>
                    <tr>
                        <td>oczekiwany</td>
                        <td>{parseSizeToHumanReadable(((compressOpt.maxSizeMB == Infinity ? 0 : compressOpt.maxSizeMB) ?? 0) * 1_000_000)}</td>
                    </tr>
                    <tr>
                        <td>wynikowy</td>
                        <td>{parseSizeToHumanReadable((ctx.processedFile?.size ?? 0))}</td>
                    </tr>
                </table>
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
        </div>
    )
}

export default CompressImageTool