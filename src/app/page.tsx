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
    <main className="p-24">
      <div className="flex flex-col w-full items-center justify-between">
        <h1>To jest nagłówek</h1>
        <h2>To jest podnagłówek</h2>
        <div className=" flex flex-col justify-center gap-3">
          <ListElement text="Event number one" onClick={() => {}} />
          <OrangeButton text="Click Me" onClick={() => {}} />
          <ResizeViewElement value={value} setValue={setValue} />
          <Dropdown
            options={["Option 1", "Option 2", "Option 3"]}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
      </div>
    </main>
  );
}
