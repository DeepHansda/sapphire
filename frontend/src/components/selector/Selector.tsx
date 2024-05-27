import React, { ChangeEvent, useContext, useEffect, useState } from "react";

import { AppContext } from "../layouts/MainLayout";
import { Select, Selection, SelectItem } from "@nextui-org/react";

export default function Selector({
  label,
  data,
  variant,
  type,
  selectedValues,
}: {
  label?: string;
  data: string[];
  variant?: string;
  type?: string;
  selectedValues?: { string: any };
}) {
  // const [selectedValue, setSelectedValue] =useState<Selection>(new Set([]));
  // const { updateModels } = useContext(AppContext);
  // console.log(selectedValue);

  // useEffect(() => {
  //   setSelectedValue &&
  //     setSelectedValue(selectedValues[type.slice(0, type.length - 1)]);
  // }, []);

  // const onSelectionChange = (value: string) => {
  //   setSelectedValue(selectedValues[value]);
  //   // const model_name = value.split("/").pop();

  //   const data = {
  //     model_name: value.currentKey,
  //     model_type: type,
  //   };

  //   updateModels(data);
  // };

  return (
    // <div>
    //   <Select
    //     onSelectionChange={(value) => onSelectionChange(value)}
    //     value={selectedValue}
    //     label={type}
    //     variant={variant}
    //     defaultSelectedKeys={[selectedValue]}
    //     className="w-[320px]"
    //     // placeholder="Select an animal"
    //   >
    //     {Object.keys(data).map((key, index) => (
    //       <SelectItem value={data[key]} key={key}>
    //         {key}
    //       </SelectItem>
    //     ))}
    //   </Select>
    // </div>

    <select defaultValue={data[0]}>
      {
        data.map((value, index) => (
          <option key={index} value={value}>
            {value}
      </option>
        ))
      }
      
    </select>
  );
}
