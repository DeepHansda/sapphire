import { ChangeEvent, useContext, useEffect, useState } from "react";

import { AppContext } from "../layouts/MainLayout";

export default function Selector({
  label,
  data,
  variant,
  defaultValue,
  type,
}: {
  label?: string;
  data: { string: any };
  variant?: string;
  defaultValue: string;
  type: string;
}) {
  const [selectedValue, setSelectedValue] = useState("");
  const { updateModels, getModels } = useContext(AppContext);
  console.log(defaultValue);

  useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);
  const onSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
    // const model_name = value.split("/").pop();

    const changedData = {
      model_name: value.split("/").pop(),
      model_type: type,
    };

    updateModels(changedData);
  };

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
    <div className="bg-default rounded-lg hover:outline hover:outline-1 hover:outline:slate-200">
      <div >
        <label htmlFor="selector" className="text-sm capitalize p-2">{type}</label>
      </div>
      <select
        className="bg-gray-900 p-2 rounded-md hover:bg-gray-800 "
        onChange={onSelectionChange}
        value={selectedValue}
        id="selector"
      >
        <option value={undefined}>None</option>
        {Object.keys(data).map((key, index) => {
          console.log(data[key]);
          return (
            <option key={key} value={data[key]}>
              {key}
            </option>
          );
        })}
      </select>
    </div>
  );
}
