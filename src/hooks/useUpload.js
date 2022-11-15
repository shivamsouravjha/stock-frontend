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
      const res = await axios.post("/", formData);
      if (res.data.data) {
        console.log(res.data);
        setUploadedImage(res.data.data);
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
    try {
      setLoading(true);

      const res = await axios.delete(`/${uploadedImage.imageName}`);
      if (res.data) {
        console.log(res.data);
        setUploadedImage(null);
        toast({
          title: "Image Deleted",
          description: res.data.message,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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
