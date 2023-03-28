import parseSizeToHumanReadable from '@/src/utils/parseSizeToHumanReadable'
import React, { FC, useContext } from 'react'
import { ActiveFile, ImageEditorContext } from '../ImageEditor'

const FileSizeDisplay: FC<{ forFile?: ActiveFile, value?: number }> = ({ forFile, value }) => {
    const ctx = useContext(ImageEditorContext)
    const sizeInBytes = value ? value : ((forFile ?? ctx.activeFile) == 'original' ? ctx.originalFile : ctx.processedFile)?.size!
    return (

        <>
            <h2>Rozmiar pliku {parseSizeToHumanReadable(sizeInBytes)}</h2>
        </>

    )
}

export default FileSizeDisplay