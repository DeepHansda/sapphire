"use client";
import {
  Button,
  Divider,
  Progress,
  Slider,
  Spacer,
  Switch,
  Textarea,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useContext, useState } from "react";
import { BiCog } from "react-icons/bi";
import { AppContext } from "../layouts/MainLayout";
import Selector from "../selector/Selector";

export default function PromptBox() {
  const {
    formDataState,
    handleFormState,
    handleFormSubmit,
    allModelsState,
    allImagesState,
  } = useContext(AppContext);
  const [slideValue, setSlideValue] = useState(0);

  const pathname = usePathname().replace("/", "");
  console.log(allImagesState);

  return (
    <div className="w-full">
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

        <div className="my-4">
          <Switch
            size="sm"
            defaultSelected
            isSelected={formDataState.use_lora}
            onValueChange={(e) => handleFormState({ use_lora: e })}
          >
            Use Lora
          </Switch>
        </div>
        {formDataState.use_lora && (
          <div className="flex gap-x-6 items-center max-w-xl">
            <Selector
              data={allModelsState.allModels?.loras}
              type="loras"
              label="loras"
              selectedValues={allModelsState.selectedModels}
            />
            <Slider
              onChange={(value) => handleFormState({ lora_scale: value })}
              step={0.01}
              label="Lora Scale"
              minValue={0}
              maxValue={1}
              size="sm"
              value={formDataState.lora_scale}
            />
          </div>
        )}
        <div className="my-6">
          <Button
            color="primary"
            className="capitalize text-black font-bold"
            onClick={() => handleFormSubmit(formDataState, pathname)}
          >
            <div className={allImagesState.isLoading && "animate-spin"}>
              <BiCog size={20} />
            </div>
            generate
          </Button>
        </div>
      </div>
      {allImagesState.isLoading && (
        <Progress
          size="sm"
          isIndeterminate
          aria-label="Loading..."
          className="max-w-full "
        />
      )}
    </div>
  );
}
