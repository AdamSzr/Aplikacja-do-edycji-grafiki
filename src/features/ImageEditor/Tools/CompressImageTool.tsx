import parseSizeToHumanReadable from '@/src/utils/parseSizeToHumanReadable';
import { Button, Slider } from '@mui/material';
import imageCompression, { Options } from 'browser-image-compression';
import { useContext, useState } from 'react';
import LinearProgressWithLabel from '../../../components/LinearProgressWithLabel';
import { ImageEditorContext } from '../ImageEditor';

const CompressImageTool = () => {
    const oneMb = 1_000_000
    const ctx = useContext(ImageEditorContext)
    const [compressionProgress, setCompressionProgress] = useState<number>(0)
    const [inProgress, setInProgress] = useState<boolean>(false)
    const [compressOpt, setCompressOpt] = useState<Options>({
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
        setCompressOpt(acc => {
            const nv = ({ ...acc, maxSizeMB: (ctx.originalFile?.size ?? 0) * (0.01 * procentage) / oneMb })
            return nv
        })
    }

    const compressFile = async (imageFile: File, options: Options = compressOpt) => {
        const compressedFile = await imageCompression(imageFile, options);
        return compressedFile
    }


    const onCompressClick = async () => {
        if (!ctx.originalFile) return
        setInProgress(true)
        const compressed = await compressFile(ctx.originalFile)
        ctx.setProcessedFile(compressed)

    }
    console.log(ctx.originalFile?.size, ctx.processedFile?.size)

    return (
        <div>

            <div>
                stopien kompresji
                <Slider
                    size="small"
                    max={100}
                    min={1}
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
                <table style={{
                }} >
                    <tr>
                        <th>plik</th>
                        <th>rozmiar pliku</th>
                    </tr>
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