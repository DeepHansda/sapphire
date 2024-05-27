import { Input, Spacer } from "@nextui-org/react";
import Image from "next/image";
import React, { ChangeEvent, useContext, useState } from "react";
import { AppContext } from "../layouts/MainLayout";

interface Imagetype {
  url: string;
  size: number;
  type: string;
}
export const ImageEditors: React.FC = () => {
  // const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  console.log(previewImage);

  const { formDataState, handleFormState } = useContext(AppContext);

  const fileChangedHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files[0];
    if (image) {
      handleFormState({ image: image });
      const imgDataUrl = window.URL.createObjectURL(image);
      setPreviewImage(imgDataUrl);
    }
  };
  // const onCrop = () => {
  //   const cropper = cropperRef.current?.cropper;
  //   // console.log(cropper.getCroppedCanvas().toDataURL());
  // };
  // const editor = useRef(null);

  // const modifyImg = () => {
  //   console.log(editor);
  //   const canvasScaled = editor.current.getImageScaledToCanvas();
  //   console.log(canvasScaled);
  //   const croppedImg = canvasScaled.toDataURL();
  //   // const splitDataURI = croppedImg.split(',')
  //   // console.log(splitDataURI)
  //   // const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
  //   // console.log(byteString)
  // const image = dataURLtoFile(croppedImg,"image.jpg")
  //     handleFormState({"image":image})

  //   // handleFormState({ image: splitDataURI[1] });
  //   const blobImg = b64toBlob(croppedImg, "image/jpeg");
  //   const preview = window.URL.createObjectURL(blobImg);
  //   setPreviewImage(preview);
  // };

  // const onImageLoad = (img) => {
  //   const blobImg = b64toBlob(img?.resource, (contentType = "image/png"));
  //   handleFormState({ image: blobImg });
  // };

  return (
    <div>
      <div className="w-full ">
        <div>
          <Input
            label="Select An Image."
            type="file"
            size="sm"
            variant="bordered"
            color="primary"
            onChange={fileChangedHandler}
          />
        </div>
        <Spacer y={6}/>
        <div className="relative w-[360px] h-full">
          <Image
            src={previewImage}
            alt="previewImg"
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};
