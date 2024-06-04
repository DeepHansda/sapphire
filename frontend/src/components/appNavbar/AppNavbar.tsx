import { Divider, Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import Link from "next/link";
import ModelsBar from "./modelsBar/modelsBar";
import { usePathname } from "next/navigation";

const tab_list = [
  { title: "text2img", link: "/" },
  { title: "img2img", link: "/img2img" },
  { title: "text2vid", link: "/text2vid" },
];
export default function AppNavbar() {
  const models = ["model1", "model2", "model3"];
  const path = usePathname();

  return (
    <div>
      <div>
        <ModelsBar />
      </div>
      <Divider />
      <Navbar position="sticky" maxWidth="full" isBlurred className="z-0">
        <NavbarContent
          justify="center"
          className="sm:max-w-[300px] w-full h-[50px] justify-center items-center data-justify-center bg-[#29252486] backdrop-blur-md px-2 my-4 rounded-lg "
        >
          {tab_list.map((tab, index) => (
            <NavbarItem
              key={index}
              className={`text-sm font-normal  p-2 uppercase rounded-lg hover:bg-default-100 hover:text-zinc-400 shadow-sm ${
                path == tab.link
                  ? "text-slate-950  bg-primary"
                  : "bg-transparent"
              }`}
            >
              <Link href={tab.link} className="" key={index}>
                {tab.title}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>
      </Navbar>
      <Divider />
    </div>
  );
}
