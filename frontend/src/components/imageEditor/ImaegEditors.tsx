import React, { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
// import Cropper, { ReactCropperElement } from "react-cropper";
import { Input } from "@nextui-org/react";
import AvatarEditor from "react-avatar-editor";
import Image from "next/image";
import { AppContext } from "../layouts/MainLayout";
import { Jimp as JimpType, JimpConstructors } from "@jimp/core";
import "jimp";
declare const Jimp: JimpType & JimpConstructors;
// import { URL } from "next/dist/compiled/@edge-runtime/primitives/url";

interface Imagetype {
  url: string;
  size: number;
  type: string;
}
export const ImageEditors: React.FC = () => {
  const [image, setImage] = useState("");
  const [previewImage,setPreviewImage] = useState("");
  const [jimpImg, setJimpImg] = useState(undefined);
  const { formDataState, handleFormState } = useContext(AppContext);
  console.log("global state", formDataState);
  // const cropperRef = useRef<ReactCropperElement>(null);
  // const handleImage = (image: Imagetype) => {
  //   setImage(image);
  // };

  const fileChangedHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };
  // const onCrop = () => {
  //   const cropper = cropperRef.current?.cropper;
  //   // console.log(cropper.getCroppedCanvas().toDataURL());
  // };
  const editor = useRef(null);


  const modifyImg = () => {
    console.log(editor)
    // const canvasScaled  = editor.current.getImageScaledToCanvas()
    // console.log(canvasScaled )
    // const croppedImg = canvasScaled.toDataURL();
    // console.log(croppedImg)
    // setPreviewImage(croppedImg);
  }



  return (
    <div>
      <div className="border border-white">
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
        <div className="mt-32 w-full h-screen flex ">
          <AvatarEditor
            ref={editor}
            image={image}
            width={formDataState.width}
            height={formDataState.height}
            border={10}
            onImageChange={modifyImg}
            color={[255, 255, 255, 0.6]} // RGBA
            scale={1.2}
            rotate={0}
          />
          <image src={previewImage} alt="preview"  className="w-full h-auto" />
        </div>
      </div>

      {/* <Cropper
        // src="https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg"
        style={{ height: 400, width: "100%" }}
        // Cropper.js options
        initialAspectRatio={16 / 9}
        guides={false}
        crop={onCrop}
        ref={cropperRef}
      /> */}
    </div>
  );
};
