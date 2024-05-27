"use client";
import { ImgMetaData } from "@/lib/types";
import {
  Button,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ScrollShadow,
  Snippet,
  Spacer,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";

const InfoItem = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="flex gap-x-3 items-center">
      <div>
        <p className="font-poppins text-sm capitalize">{title}</p>
      </div>
      <Chip size="md" radius="sm" variant="shadow">
        <p className="font-poppins text-xs">{value}</p>
      </Chip>
    </div>
  );
};

export default function ImgModal({
  isOpen,
  onOpen,
  onOpenChange,
  imgData,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  imgData: ImgMetaData;
}) {
  return (
    <div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Image Info.</ModalHeader>
              <ModalBody>
                <div>
                  <div>
                    <Chip
                      size="sm"
                      variant="shadow"
                      radius="sm"
                      className="font-poppins font-bold mb-2"
                    >
                      Prompt
                    </Chip>

                    <ScrollShadow
                      orientation="vertical"
                      className="max-h-[100px]"
                    >
                      <div className="p-4 bg-default/40 rounded-lg">
                        <p className="font-poppins text-sm">
                          {imgData?.prompt}
                        </p>
                      </div>
                    </ScrollShadow>
                  </div>
                  <Spacer y={2} />
                  <div>
                    <Chip
                      size="sm"
                      variant="shadow"
                      radius="sm"
                      className="font-poppins font-bold mb-2"
                    >
                      Negative Prompt
                    </Chip>

                    <ScrollShadow
                      orientation="vertical"
                      className="max-h-[100px]"
                    >
                      <div className="p-4 bg-default/40 rounded-lg">
                        <p className="font-poppins text-sm">
                          {imgData?.negative_prompt}
                        </p>
                      </div>
                    </ScrollShadow>
                  </div>
                  <Spacer y={4} />

                  <div className="flex flex-wrap gap-4">
                  <InfoItem
                      title="seed"
                      value={imgData?.seed?.toString()}
                    />
                    <InfoItem
                      title="width"
                      value={imgData?.width?.toString()}
                    />
                    <InfoItem
                      title="height"
                      value={imgData?.height?.toString()}
                    />
                    <InfoItem
                      title="steps"
                      value={imgData?.steps?.toString()}
                    />
                    <InfoItem title="scheduler" value={imgData?.scheduler} />
                    <InfoItem
                      title="use kerras"
                      value={String(imgData?.use_kerras)}
                    />
                    <InfoItem
                      title="guidance scale"
                      value={imgData?.guidance_scale?.toString()}
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
