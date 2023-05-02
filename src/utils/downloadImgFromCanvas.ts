

export default function downloadImgFromCanvas(canvasElement:HTMLCanvasElement){
    const linkElement = document.createElement('a')

    canvasElement.toDataURL()
    const dataUrl = canvasElement.toDataURL()
    linkElement.href = dataUrl
    linkElement.download = `true`

    linkElement.click()
}