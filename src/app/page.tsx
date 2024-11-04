"use client";
import { OrangeButton } from "@/components/OrangeButton";
import { ListElement } from "@/components/ListElement";
import { ResizeViewElement } from "@/components/ResizeViewElement";
import { useState } from "react";
import { Dropdown } from "@/components/Dropdown";

export default function Home() {
  const [value, setValue] = useState(0);
  const [selected, setSelected] = useState("Option 1");
  return (
    <main>
      <div className="flex w-full flex-col items-center justify-between">
        <Dropdown
          options={["Option 1", "Option 2", "Option 3"]}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
    </main>
  );
}
