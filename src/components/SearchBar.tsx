"use client";

export function SearchBar() {
  return (
    <div className="flex w-56 justify-between rounded-md border-2 border-primary p-2">
      <input
        type="text"
        placeholder="Search"
        className="w-full bg-transparent text-lg text-primary focus:outline-none"
      />
      <button className="rounded-md bg-primary p-1 text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-accent"
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
