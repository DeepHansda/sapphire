import { ChangeEvent, useContext, useEffect, useState } from "react";

import { AppContext } from "../layouts/MainLayout";

export default function Selector({
  label,
  data,
  variant,
  defaultValue,
  onChange,
}: {
  label: string;
  data: { [key: string]: any } | any[];
  variant?: string;
  defaultValue: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}) {
  const [selectedValue, setSelectedValue] = useState("");
  const { updateModels, getModels } = useContext(AppContext);
  console.log(Array.isArray(data));

  return (
    <div className="bg-[#1f293765] backdrop-blur-md rounded-lg hover:outline hover:outline-1 hover:outline:slate-200">
      <div>
        <label htmlFor="selector" className="text-sm capitalize p-2">
          {label}
        </label>
      </div>
      <select
        className="bg-default  p-2 rounded-md hover:bg-gray-800 "
        onChange={onChange}
        defaultValue={defaultValue}
        // value={selectedValue}
        // onSelect={(e)=>setSelectedValue(e.)}
        id="selector"
      >
        <option value={undefined}>None</option>
        {Array.isArray(data)
          ? data?.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))
          : Object.keys(data).map((key, index) => (
              <option key={key} value={data[key]}>
                {key}
              </option>
            ))}
      </select>
    </div>
  );
}
