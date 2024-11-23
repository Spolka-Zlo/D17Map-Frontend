"use client";

import { Dispatch, SetStateAction, createContext, useState } from "react";
import { twMerge } from "tailwind-merge";

type AdminPanelListItemProps = {
  children: React.ReactNode;
  name: string;
};

export const EditContext = createContext<{
  editedElement: string | null;
  setEditedElement: Dispatch<SetStateAction<string | null>>;
}>({
  editedElement: null,
  setEditedElement: () => {},
});

export function AdminPanelListItem({
  children,
  name,
}: AdminPanelListItemProps) {
  const [openedElement, setOpenedElement] = useState(false);
  const [editedElement, setEditedElement] = useState<null | string>(null);

  return (
    <div className="flex flex-col gap-4">
      <h1
        className="w-full rounded-md border-b-2 border-l-2 border-black p-2"
        onClick={() => setOpenedElement(!openedElement)}
      >
        {name}
      </h1>
      <div
        className={twMerge("flex justify-between", !openedElement && "hidden")}
      >
        <EditContext.Provider value={{ editedElement, setEditedElement }}>
          {children}
        </EditContext.Provider>
      </div>
    </div>
  );
}
