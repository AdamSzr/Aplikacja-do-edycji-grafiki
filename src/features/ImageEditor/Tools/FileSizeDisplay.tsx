import parseSizeToHumanReadable from '@/src/utils/parseSizeToHumanReadable'
import React, { FC, useContext } from 'react'
import { ActiveFile, ImageEditorContext } from '../ImageEditor'

const FileSizeDisplay: FC<{ forFile?: ActiveFile, value?: number, text?: string }> = ({ forFile, value, text = "Rozmiar pliku" }) => {
    const ctx = useContext(ImageEditorContext)

    let sizeInBytes = value ? value : ((forFile ?? ctx.activeFile) == 'original' ? ctx.originalFile : ctx.processedFile)?.size!

    if (isNaN(sizeInBytes)) {
        sizeInBytes = 0
    }

    return (
        <h2>{text} {parseSizeToHumanReadable(sizeInBytes)}</h2>
    )
}

export default FileSizeDisplay