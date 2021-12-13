import React, { useState } from 'react'
import { VButton } from '..'
// import classes from './index.module.css'


interface IFileUplodProps {
  initialImage: string,
  setFile: Function,
  file: Function,
}

const ImageUpload = ({initialImage, setFile, file}: IFileUplodProps) => {
  const [userImage, setUserImage] = useState(null);

  const imageSrc = userImage || initialImage || "https://via.placeholder.com/100/ffffff";
  
  const handleImageFile = (event: any) => {
    file(event.target?.files[0]);
    let reader = new FileReader();
    reader.onload = (e: any) => {
      setUserImage(e.target?.result);
      setFile(e.target?.result);
    }
    
    reader.readAsDataURL(event.target?.files[0]);
  }
  
  return (
    <>
      <input id='imageInput' className="hidden" type="file" accept="image/png" onChange={handleImageFile}/>
      <label className="inline-block cursor-pointer mb-4" htmlFor="imageInput">
        <VButton className="pointer-events-none">Upload image</VButton>
      </label>
      
      <img
        className="h-24"
        src={imageSrc}
        alt="avatar"
      />
    </>
  )
}

export default ImageUpload

