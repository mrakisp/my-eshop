import React, { ChangeEvent, useState } from "react";
import { Button, FormControl, InputLabel, Input } from "@mui/material";

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  accept?: string; // Add the accept prop here
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect, accept }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedImage(files[0]);
      onImageSelect(files[0]);
    }
  };

  //   const handleUpload = () => {
  //     if (selectedImage) {
  //       onImageSelect(selectedImage);
  //     }
  //   };

  return (
    <Input
      type="file"
      id="image-upload"
      inputProps={{ accept: accept }}
      //accept={accept} // Pass the accept prop to the Input component
      onChange={handleImageChange}
    />
    // <FormControl>
    //   {/* <InputLabel htmlFor="image-upload">Upload Image</InputLabel> */}
    //   <Input
    //     type="file"
    //     id="image-upload"
    //     //accept={accept} // Pass the accept prop to the Input component
    //     onChange={handleImageChange}
    //   />
    //   {/* <Button variant="contained" color="primary" onClick={handleUpload}>
    //     Upload
    //   </Button> */}
    // </FormControl>
  );
};

export default ImageUpload;
