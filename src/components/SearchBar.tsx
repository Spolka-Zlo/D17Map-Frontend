"use client";

import { useState } from "react";

export function SearchBar({ onChange }: { onChange?: (room: string) => void }) {
  const [search, setSearch] = useState("");
  return (
    <div className="flex h-10 w-44 justify-between rounded-md border-2 border-primary p-2">
      <input
        type="text"
        placeholder="Search"
        className="w-full bg-transparent text-lg text-primary focus:outline-none"
        onChange={(e) => {
          e.preventDefault();
          setSearch((e.target as HTMLInputElement).value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && onChange) {
            onChange(search.replace(".", ""));
          }
        }}
      />
      <button
        onClick={() => {
          if (onChange) onChange(search.replace(".", ""));
        }}
        className="rounded-md bg-primary px-1 py-0.5 text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-accent"
          fill="none"
          viewBox="2 2 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 19l-4-4"
          />
        </svg>
      </button>
    </div>
  );
}
