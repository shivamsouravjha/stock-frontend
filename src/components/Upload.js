import { Button, Heading, VStack, Image, HStack, Tag, useToast } from "@chakra-ui/react";
import React, { useRef } from "react";
import useUpload from "../hooks/useUpload";

function Upload() {
  const imageRef = useRef(null);
  const toast = useToast();
  const {
    loading,
    image,
    handleRemoveImage,
    handleChangeImage,
    handleUploadImage,
    uploadedImage,
  } = useUpload();

  const handleRemove = () => {
    handleRemoveImage()
  };

  return (
    <>
      <input
        style={{ display: "none" }}
        type="file"
        accept="image/*"
        ref={imageRef}
        onChange={handleChangeImage}
      />
      <VStack>
        <Heading>Your online gallery</Heading>
        <Button
          onClick={() => imageRef.current.click()}
          colorScheme="blue"
          size="lg"
        >
          Select Image
        </Button>
      </VStack>

      {image && (
        <VStack my="4">
          <Image
            src={URL.createObjectURL(image)}
            width="300px"
            height="300px"
            alt="selected image..."
          />
          <Button
            onClick={handleUploadImage}
            variant="outline"
            colorScheme="green"
            isLoading={loading}
          >
            Upload
          </Button>
        </VStack>
      )}

      {uploadedImage && (
        <VStack my="4">
          <Image
            src={uploadedImage}
            width="300px"
            height="300px"
            alt={uploadedImage.imageName}
          />

          <HStack>
            <Button
              variant="solid"
              colorScheme="red"
              onClick={handleRemove}
              isLoading={loading}
            >
              Delete
            </Button>
          </HStack>
        </VStack>
      )}
    </>
  );
}

export default Upload;
