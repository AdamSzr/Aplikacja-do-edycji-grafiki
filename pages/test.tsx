import imageCompression from 'browser-image-compression';
import React from 'react'

const test = () => {

    async function handleImageUpload(event:any) {

        const imageFile = event.target.files[0];
        console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
        console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
      
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        }
        try {
          const compressedFile = await imageCompression(imageFile, options);
          console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
          console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
          const a = document.createElement("a")
          a.href = URL.createObjectURL(compressedFile)
          a.download="an-compressed-file.jpg"
          a.click()
          return compressedFile

        //   await uploadToServer(compressedFile); // write your own logic
        } catch (error) {
          console.log(error);
        }
      
      }

      const onFileInputChange = async (e:any)=>{
        const imageFile = e.target.files[0];
        console.log({imageFile})
        const converted  = await handleImageUpload(e)
        console.log({converted})

        // await handleImageUpload(e)
      }

  return (
    <div>
        <h1>
        test
        </h1>
        <input type='file' onClick={(e)=>console.log({e})} onChange={onFileInputChange}/>

    </div>
  )
}

export default test

function uploadToServer(compressedFile: File) {
    throw new Error('Function not implemented.');
}
