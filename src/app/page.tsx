"use client";
import { OrangeButton } from "@/components/OrangeButton";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1>To jest nagłówek</h1>
        <div className="absolute z-10 top-44 left-44 w-36 h-32">
          <OrangeButton text="Click Me" onClick={() => {}} />
        </div>
      </div>
    </main>
  );
}
