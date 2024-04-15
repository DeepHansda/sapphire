"use client";
import { Button, Divider, Spacer, Textarea } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { BiCog } from "react-icons/bi";
import { AppContext } from "../layouts/MainLayout";

export default function PromptBox() {
  const { formDataState, handleFormState, handleFormSubmit } =
    useContext(AppContext);
  const pathname = usePathname().replace("/", "");

  return (
    <div>
      <Divider className="my-6" />

      <div className="w-full">
        <div className="w-full">
          <Textarea
            size="md"
            isRequired
            variant="bordered"
            color="primary"
            label="Positive Prompt"
            labelPlacement="outside"
            placeholder="Enter Positive Prompt"
            className="w-full"
            value={formDataState.prompt}
            onChange={(e) => handleFormState({ prompt: e.target.value })}
          />
        </div>
        <Spacer y={4} />
        <div>
          <Textarea
            size="md"
            isRequired
            variant="bordered"
            color="primary"
            label="Negative Prompt"
            labelPlacement="outside"
            placeholder="Enter Negative Prompt"
            className="w-full"
            value={formDataState.negative_prompt}
            onChange={(e) =>
              handleFormState({ negative_prompt: e.target.value })
            }
          />
        </div>
        <Spacer y={4} />
        <div>
          <Button
            color="primary"
            className="capitalize text-black font-bold"
            onClick={() => handleFormSubmit(formDataState, pathname)}
          >
            <div className="animate-spin">
              <BiCog size={20} />
            </div>
            generate
          </Button>
        </div>
      </div>
      <Divider className="my-6" />
    </div>
  );
}
