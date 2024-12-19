"use client";
import { useState } from "react";
import { Dropdown } from "@/components/Dropdown";

export default function Home() {
  const [selected, setSelected] = useState("D17");
  return (
    <main>
      <div className="flex w-full flex-col items-center justify-between">
        <Dropdown
          options={["D17", "A0", "D4"]}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
    </main>
  );
}
