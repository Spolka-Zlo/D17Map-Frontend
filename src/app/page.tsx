"use client";
import { useState } from "react";
import { Dropdown } from "@/components/Dropdown";

export default function Home() {
  const [selected, setSelected] = useState("D17");
  return (
    <main>
      <div className="flex h-full w-full flex-col items-center justify-between">
        <h1 className="text-4xl font-bold">Witaj w D17 MAP!</h1>
        <h2>Wybierz budynek, który chcesz przeglądać.</h2>
        <Dropdown
          options={["D17", "A0", "D4"]}
          selected={selected}
          setSelected={setSelected}
          className="h-48"
        />
      </div>
    </main>
  );
}
