import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const useUpload = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [uploadedImage, setUploadedImage] = useState(null);

  const toast = useToast();

  const handleChangeImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUploadImage = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", image);
      console.log(axios)
      const res = await axios.post("/api/cat", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(res.data);
      if (res.data) {
        console.log(res.data);
        const imageUrl = res.data ? res.data : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7sjRsyfEjbxtT1T-GCgW6N5VfI8B28-jPIg&s";
        console.log(imageUrl)
        setUploadedImage(imageUrl);
        toast({
          title: "Image Uploaded",
          description: res.data.message,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setImage(null);
      setLoading(false);
    }
  };

  const handleRemoveImage = async () => {
    if (!uploadedImage) return;
    setUploadedImage(null);
  
  };

  return {
    image,
    uploadedImage,
    loading,
    handleChangeImage,
    handleUploadImage,
    handleRemoveImage,
  };
};

export default useUpload;
