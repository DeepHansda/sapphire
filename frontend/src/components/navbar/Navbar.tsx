import { Divider, Spacer, Tab, Tabs, Textarea } from "@nextui-org/react";
import Selector from "../selector/Selector";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { AppContext } from "../layouts/MainLayout";
const tab_list = ["text2img", "img2img", "text2vid"];
export default function Navbar() {
  const models = ["model1", "model2", "model3"];
  const { allModelsState, getModels } = useContext(AppContext);
  console.log(allModelsState);
  useEffect(() => {
    getModels();
  }, []);
  return (
    <nav className="w-full">
      <div className="w-full">
        <div className="flex flex-auto gap-x-6 w-[650px]">
          {Object.keys(allModelsState.allModels).map((key, index) => (
            <Selector
              key={index}
              data={allModelsState.allModels[key]}
              label={key}
              variant="bordered"
              type={key}
            />
          ))}
          <div></div>
        </div>
      </div>
      <Spacer y={4} />
      <div className="">
        <Tabs variant="bordered" color="primary">
          {tab_list.map((tab, index) => (
            <Tab key={index}>
              <Link href={tab} className="">
                {tab}
              </Link>
            </Tab>
          ))}
        </Tabs>
      </div>
    </nav>
  );
}
