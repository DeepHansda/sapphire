import {
  Divider,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Progress,
  Spacer,
  Tab,
  Tabs,
  Textarea,
} from "@nextui-org/react";
import Selector from "../selector/Selector";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { AppContext } from "../layouts/MainLayout";
import { getAllSelectedValues } from "@/lib/api";
import ModelsBar from "./modelsBar/modelsBar";

const tab_list = ["text2img", "img2img", "text2vid"];
export default function AppNavbar() {
  const models = ["model1", "model2", "model3"];

  return (
    <div>
      <div>
        <ModelsBar />
      </div>
      <Divider />
      <Navbar position="sticky" maxWidth="full" >
        <NavbarContent>
          {tab_list.map((tab, index) => (
            <NavbarItem>
              <Link href={tab} className="" key={index}>
                {tab}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>
      </Navbar>
    </div>
  );
}
