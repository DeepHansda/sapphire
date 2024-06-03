import { AppContext } from "@/components/layouts/MainLayout";
import Selector from "@/components/selector/Selector";
import {
  Accordion,
  AccordionItem,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Progress,
} from "@nextui-org/react";
import { ChangeEvent, useContext, useEffect } from "react";
import { FaBars } from "react-icons/fa6";
function ModelsBar() {
  const { allModelsState, getModels, setOpenSidebar,updateModels } = useContext(AppContext);
  console.log(allModelsState);
  useEffect(() => {
    getModels();
  }, []);

  const filterModels = (key: string) => {
    const models = allModelsState.allModels.all_models[key];
    if (Object.keys(models).length !== 0) {
      const modelType = key == "vae" ? "vae" : key.slice(0, -1); // To match the key in selected_models
      const defaultModel =
        allModelsState.allModels?.selected_models[modelType] || "";
      return { models, defaultModel };
    }
    return null;
  };

  const onSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const type = e.target.options.selectedIndex;
    // const model_name = value.split("/").pop();

    console.log(type)
    const changedData = {
      model_name: value.split("/").pop(),
      model_type: type,
    };

    // updateModels(changedData);
  };
  return (
    <div>
      {allModelsState.isLoading ? (
        <Progress
          color="success"
          aria-label="Loading..."
          isIndeterminate
          label="Loading Models..."
          size="sm"
        />
      ) : (
        <Navbar position="sticky" maxWidth="full"  className="z-0 py-3 xl:py-4" >
          <NavbarBrand className="xl:hidden">
            <div>
              <FaBars
                className="text-2xl cursor-pointer"
                onClick={() => setOpenSidebar(true)}
              />
            </div>
          </NavbarBrand>
          <NavbarContent className="relative" justify="start">
            {/* <div className="absolute z-auto  h-80">
             

              {Object.keys(allModelsState?.allModels?.all_models).map(
                  (key, index) => {
                    const filteredModels = filterModels(key)
                    if(filteredModels==null){
                      return null;
                    }
                    return (
                      <NavbarItem key={index}>
                        <Selector
                          data={filteredModels?.models}
                          label={key}
                          variant="bordered"
                          defaultValue={filteredModels?.defaultModel}
                          type={key}
                        />
                      </NavbarItem>
                    );
                  }
                )}
               
            </div> */}
            <div className="">
              <div className="overflow-x-scroll w-[320px] flex flex-auto gap-x-6 md:w-[700px] lg:w-[1000px] xl:w-[100%] xl:overflow-x-hidden ">
                {Object.keys(allModelsState?.allModels?.all_models).map(
                  (key, index) => {
                    const filteredModels = filterModels(key)
                    if(filteredModels==null){
                      return null;
                    }
                    return (
                      <NavbarItem key={index}>
                        <Selector
                          data={filteredModels?.models}
                          label={key}
                          variant="bordered"
                          defaultValue={filteredModels?.defaultModel}
                         />
                      </NavbarItem>
                    );
                  }
                )}
              </div>
            </div>
          </NavbarContent>
          <NavbarContent justify="center"></NavbarContent>
          <NavbarContent justify="end"></NavbarContent>
        </Navbar>
      )}
    </div>
  );
}

export default ModelsBar;
