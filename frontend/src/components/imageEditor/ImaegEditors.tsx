import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
// import Cropper, { ReactCropperElement } from "react-cropper";
import { Input } from "@nextui-org/react";
import AvatarEditor from "react-avatar-editor";
import Image from "next/image";
import { AppContext } from "../layouts/MainLayout";
import { Jimp as JimpType, JimpConstructors } from "@jimp/core";
import "jimp";
import { b64toBlob, dataURLtoFile } from "@/lib/utils";
import {Image as EditorImagee } from "image-js";
declare const Jimp: JimpType & JimpConstructors;
// import { URL } from "next/dist/compiled/@edge-runtime/primitives/url";

interface Imagetype {
  url: string;
  size: number;
  type: string;
}
export const ImageEditors: React.FC = () => {
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [jimpImg, setJimpImg] = useState(undefined);
  const { formDataState, handleFormState } = useContext(AppContext);
  console.log("global state", formDataState);
  // const cropperRef = useRef<ReactCropperElement>(null);
  // const handleImage = (image: Imagetype) => {
  //   setImage(image);
  // };

  const fileChangedHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      EditorImagee.load(event.target.files[0]).then((img) => {
        console.log(img)
      })
      // console.log(event.target.files[0]);
      handleFormState({"image": event.target.files[0]});
    }
  };
  // const onCrop = () => {
  //   const cropper = cropperRef.current?.cropper;
  //   // console.log(cropper.getCroppedCanvas().toDataURL());
  // };
  const editor = useRef(null);

  const modifyImg = () => {
    console.log(editor);
    const canvasScaled = editor.current.getImageScaledToCanvas();
    console.log(canvasScaled);
    const croppedImg = canvasScaled.toDataURL();
    // const splitDataURI = croppedImg.split(',')
    // console.log(splitDataURI)
    // const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
    // console.log(byteString)
  const image = dataURLtoFile(croppedImg,"image.jpg")
      handleFormState({"image":image})
    
    // handleFormState({ image: splitDataURI[1] });
    const blobImg = b64toBlob(croppedImg, "image/jpeg");
    const preview = window.URL.createObjectURL(blobImg);
    setPreviewImage(preview);
  };

  const onImageLoad = (img) => {
    const blobImg = b64toBlob(img?.resource, (contentType = "image/png"));
    handleFormState({ image: blobImg });
  };

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
        {/* <div className="mt-32 w-full h-screen flex flex-col gap-y-32">
          <AvatarEditor
            ref={editor}
            image={image}
            width={formDataState.width}
            height={formDataState.height}
            border={5}
            onImageChange={modifyImg}
            onLoadSuccess={onImageLoad}
            color={[255, 255, 255, 0.6]} // RGBA
            scale={1.4}
            rotate={0}
          />
          <div className="relative">
            <image
              src={previewImage}
              alt="preview"
              className="w-full h-auto z-10"
            />
          </div>
        </div> */}
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
