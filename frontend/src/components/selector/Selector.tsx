import { Select, SelectItem } from "@nextui-org/react";
import React, { use, useContext, useEffect, useState } from "react";
import { AppContext } from "../layouts/MainLayout";

export default function Selector({
  label,
  data,
  variant,
  type,
}: {
  label: string;
  data: { string: any };
  variant: string;
  type: string;
}) {
  const { getSelectedValues, allModelsState } = useContext(AppContext);
  const [selectedValue,setSelectedValue] = useState("");
  useEffect(() => {
    getSelectedValues();
    const defaultkey = Object.keys(allModelsState.selectedModels).find(
      (key) => key == type.slice(0, type.length - 1)
    );
  
    const defaultValue = allModelsState.selectedModels[defaultkey];
    setSelectedValue(defaultValue);
  }, []);

  return (
    <div className="font-poppins w-full">
      <Select
        className="capitalize"
        size="sm"
        label={label}
        variant={variant}
        // defaultOpen={defaultValue}
        color="primary"
        defaultSelectedKeys={[selectedValue]}
        value={selectedValue}
        // onChange={}
      >
        {data &&
          Object.keys(data).map((d, index) => {
       
            return (
              <SelectItem
                title={d}
                value={data[d]}
                key={index}
                className="capitalize"
              />
            );
          })}
      </Select>
    </div>
  );
}
