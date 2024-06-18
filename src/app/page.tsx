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
      <div className="flex flex-col w-full items-center justify-between"></div>
    </main>
  );
}
