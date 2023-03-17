import imageCompression, { Options } from 'browser-image-compression';
import React, { useRef, useState } from 'react'

const test = () => {

  const [file, setFile] = useState<File | null>()
  const [processedFile, setProcessedFile] = useState<File | null>()
  const [ testStore,setTestStore] = useState<any>()
  const canvasRef = useRef<HTMLCanvasElement|null>() 
  const compressionDefaultOptions: Options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,

    useWebWorker: true,
    onProgress: (e) => {
      console.log({ e })
    }
  }

  async function handleImageUpload(event: any) {
    const imageFile = event.target.files[0];
    console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

    // TODO: 
    // progressBarr
    // max size slider
    // max width/height slider
    // podgląd
    // resize img
    // download img button
    // nowa nazwa dla przetworzonego obrazka
    // rysowanie po obrazku
    // filtry obrazka - wyostrzanie, blurowanie
    // histogram kolorów



    // imageCompression.getDataUrlFromFile(file: File): Promise<base64 encoded string>
    // imageCompression.getFilefromDataUrl(dataUrl: string, filename: string, lastModified?: number): Promise<File>
    // imageCompression.loadImage(url: string): Promise<HTMLImageElement>
    // imageCompression.drawImageInCanvas(img: HTMLImageElement, fileType?: string): HTMLCanvasElement | OffscreenCanvas
    // imageCompression.drawFileInCanvas(file: File, options?: Options): Promise<[ImageBitmap | HTMLImageElement, HTMLCanvasElement | OffscreenCanvas]>
    // imageCompression.canvasToFile(canvas: HTMLCanvasElement | OffscreenCanvas, fileType: string, fileName: string, fileLastModified: number, quality?: number): Promise<File>
    // imageCompression.getExifOrientation(file: File): Promise<number> // based on https://stackoverflow.com/a/32490603/10395024
    // imageCompression.copyExifWithoutOrientation(copyExifFromFile: File, copyExifToFile: File): Promise<File> // based on https://gist.github.com/tonytonyjan/ffb7cd0e82cb293b843ece7e79364233

    const options: Options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,

      useWebWorker: true,
      onProgress: (e) => {
        console.log({ e })
      },


    }



  }



  const downloadFile = () => {
    if(!processedFile)return

    const a = document.createElement("a")
    a.href = URL.createObjectURL(processedFile)
    a.download = "an-compressed-file.jpg"
    a.click()
  }

  const compressFile = async (imageFile: File, options: Options=compressionDefaultOptions) => {
    const compressedFile = await imageCompression(imageFile, options);

    console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
    console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
    return compressedFile
  }

  const onFileInputChange = async (e: any) => {
    const imageFile = e.target.files[0];
    console.log({ imageFile })
    // const converted = await handleImageUpload(e)
    // console.log({ converted })
    setFile(imageFile)
    const [htmlImageElement,canvas] =  await imageCompression.drawFileInCanvas(imageFile)
    console.log({htmlImageElement,canvas})
    setTestStore(htmlImageElement)
    canvasRef.current?.getContext(`2d`)?.drawImage(htmlImageElement,0,0)
    // await handleImageUpload(e)
  }

  const onCompressClick =async () => {
    if(!file) return
    const compressed = await compressFile(file)
    setProcessedFile(compressed)
  }

  const onDownloadClick = () =>{
    downloadFile()
  }

  return (
    <div>

      <input type='file' onClick={(e) => console.log({ e })} onChange={onFileInputChange} />
      <input type='text' placeholder='nazwa pliku'></input>

      <button onClick={onCompressClick} >compress </button>
      <button onClick={onDownloadClick}>download</button>

      <canvas width={500} height={500} style={{border:'2px solid black'}} ref={canvasRef as any} />
      {/* {testStore} */}
    </div>
  )
}

export default test

function uploadToServer(compressedFile: File) {
  throw new Error('Function not implemented.');
}
