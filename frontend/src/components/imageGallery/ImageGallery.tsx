import { Divider, Image } from "@nextui-org/react";
import NextImage from "next/image";

import React, { Fragment } from "react";
import ImgWithButton from "../imgWithButton/ImgWithButton";

export default function ImageGallery({ img_list }: { img_list: any }) {
  return (
    <div className="w-full">
      {img_list?.map((galleryData, index) => {
        const date = new Date(galleryData.date);
        return (
          <Fragment key={index}>
            <Divider className="my-4" />
            <div>{`${date.getFullYear()}`}</div>
            <div className="w-full h-full flex flex-wrap justify-left items-center gap-8">
              {galleryData?.sub_dir_images?.map((img, imgIndex) => (
                <div key={imgIndex}>
                  <ImgWithButton
                    encoded_img={img?.enc_img}
                    imgData={img?.img_data}
                  />
                </div>
              ))}
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
