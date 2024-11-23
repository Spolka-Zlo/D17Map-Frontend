"use client";

import { useContext } from "react";
import { EditContext } from "../AdminPanelListItem";
import { EditDeleteButtonsSection } from "../EditDeleteButtonsSection";
import { twMerge } from "tailwind-merge";
import { Equipment } from "@/schemas/equipmentSchemas";

type AdminPanelEquipmentListProps = {
  equipments: Equipment[];
};

export function AdminPanelEquipmentList({
  equipments,
}: AdminPanelEquipmentListProps) {
  const { editedElement, setEditedElement } = useContext(EditContext);
  return (
    <ul className="flex flex-col items-stretch justify-start gap-2 p-2">
      <span
        className="cursor-pointer rounded-md border-2 border-primary bg-white/0 p-2 text-center"
        onClick={() => setEditedElement(null)}
      >
        Clear
      </span>
      {equipments.map((equipment) => (
        <li
          key={equipment.id}
          className={twMerge(
            "flex items-center justify-between gap-2 rounded-md border-2 border-primary bg-white/0 p-2",
            editedElement === equipment.name && "bg-accent/10",
          )}
        >
          <h3>{equipment.name}</h3>

          <EditDeleteButtonsSection
            onEdit={() => setEditedElement(equipment.name)}
            onDelete={() => {}}
          />
        </li>
      ))}
    </ul>
  );
}
