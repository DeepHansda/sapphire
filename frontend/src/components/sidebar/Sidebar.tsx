import {
  Button,
  Divider,
  Input,
  ScrollShadow,
  Select,
  SelectItem,
  Slider,
  Switch,
} from "@nextui-org/react";
import { useContext } from "react";
import SidebarTitle from "./components/SidebarTitle";
import { AppContext } from "../layouts/MainLayout";

const num_of_imgs_list = [1, 2, 3, 4, 5, 6, 7, 8];
const schedulers = [
  "eular",
  "eular_a",
  "heun",
  "lms",
  "unipc",
  "dpm_2",
  "dpm_2_a",
  "dpmpp_2m",
  "dpmpp_sde",
  "dpmpp_2m_sde",
];

export default function Sidebar() {
  const { formDataState, handleFormState } = useContext(AppContext);

  return (
    <div className="w-auto h-screen ">
      <ScrollShadow
        size={80}
        offset={10}
        orientation="vertical"
        className="w-[300px] max-h-screen scrollbar-thin  p-6"
      >
        <div className=" ">
          <div>
            <div className="flex flex-col gap-y-6">
              <SidebarTitle title="image dimentions" />
              <div className="flex flex-col gap-y-2">
                <Slider
                  size="sm"
                  color="primary"
                  label="Width"
                  maxValue={2048}
                  minValue={256}
                  defaultValue={formDataState?.width}
                  className="max-w-sm"
                  value={formDataState?.width}
                  onChange={(e) => handleFormState({ width: e })}
                />
                <Input
                  variant="bordered"
                  size="sm"
                  type="number"
                  placeholder="width"
                  color="primary"
                  defaultValue={formDataState?.width.toString()}
                  value={formDataState?.width.toString()}
                  onValueChange={(e) => handleFormState({ width: e })}
                />
              </div>

              <div className="flex flex-col gap-y-2">
                <Slider
                  size="sm"
                  color="primary"
                  label="Height"
                  maxValue={2048}
                  minValue={256}
                  defaultValue={formDataState?.height}
                  value={formDataState?.height}
                  onChange={(e) => handleFormState({ height: e })}
                  className="max-w-sm"
                />
                <Input
                  variant="bordered"
                  size="sm"
                  type="number"
                  placeholder="height"
                  color="primary"
                  name="height"
                  defaultValue={formDataState?.height.toString()}
                  value={formDataState?.height.toString()}
                  onValueChange={(e) => handleFormState({ height: e })}
                />
              </div>
            </div>

            <Divider className="my-6" />
            <div className="flex flex-col gap-y-6">
              <SidebarTitle title="number of images" />
              <div>
                <div className="flex flex-wrap gap-4">
                  {num_of_imgs_list.map((num, index) => (
                    <Button
                      color="primary"
                      size="sm"
                      variant="ghost"
                      key={index}
                      className={`${
                        formDataState.batch_size == num
                          ? "bg-yellow_green text-black"
                          : ""
                      }`}
                      onClick={(e) => handleFormState({ batch_size: num })}
                    >
                      {num}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <Divider className="my-6" />
            <div className="flex flex-col gap-y-6">
              <SidebarTitle title="Guidance Scale" />
              <div className="flex flex-col gap-y-2">
                <Slider
                  size="sm"
                  color="primary"
                  label="Guidance Scale"
                  maxValue={30}
                  minValue={0}
                  step={0.01}
                  defaultValue={formDataState?.guidance_scale}
                  value={formDataState?.guidance_scale}
                  onChange={(e) => handleFormState({ guidance_scale: e })}
                  className="max-w-sm"
                />
                <Input
                  variant="bordered"
                  size="sm"
                  type="number"
                  step={0.01}
                  placeholder="Guidance Scale"
                  color="primary"
                  defaultValue={formDataState.guidance_scale.toString()}
                  value={formDataState?.guidance_scale?.toString()}
                  onChange={(e) =>
                    handleFormState({ guidance_scale: e.target.value })
                  }
                />
              </div>
            </div>

            <Divider className="my-6" />
            <div className="flex flex-col gap-y-6">
              <SidebarTitle title="schedulers" />
              <div className="font-poppins">
                <Select
                  size="sm"
                  label="Select Scheduler"
                  variant="bordered"
                  color="primary"
                  onChange={(e) =>
                    handleFormState({ scheduler: e.target.value })
                  }
                >
                  {schedulers.map((scheduler, index) => (
                    <SelectItem
                      title={scheduler}
                      value={scheduler}
                      key={scheduler}
                    />
                  ))}
                </Select>
                <Switch
                  defaultSelected
                  size="sm"
                  className="mt-4"
                  isSelected={formDataState.use_kerras}
                  onValueChange={(e) => handleFormState({ use_kerras: e })}
                >
                  Use Kerras
                </Switch>
              </div>
            </div>
            <Divider className="my-6" />
            <div className="flex flex-col gap-y-6">
              <SidebarTitle title="seed" />
              <div className="font-poppins">
                <Input
                  variant="bordered"
                  size="sm"
                  type="number"
                  placeholder="Seed"
                  color="primary"
                  defaultValue={formDataState.seed.toString()}
                  onChange={(e) => handleFormState({ seed: e.target.value })}
                />
                <Switch
                  defaultSelected
                  size="sm"
                  className="mt-4"
                  isSelected={formDataState.fixed_seed}
                  onValueChange={(e) => handleFormState({ fixed_seed: e })}
                >
                  Fixed Seed
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </ScrollShadow>
    </div>
  );
}
