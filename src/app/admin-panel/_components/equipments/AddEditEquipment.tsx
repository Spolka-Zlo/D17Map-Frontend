"use client";

import { useContext } from "react";
import { EditContext } from "../AdminPanelListItem";
import { AddEquipmentForm } from "./AddEquipmentForm";
import { Equipment } from "@/schemas/equipmentSchemas";

export function AddEditEquipment({ equipments }: { equipments: Equipment[] }) {
  const { editedElement } = useContext(EditContext);
  const equipment = equipments.find(
    (equipment) => equipment.name === editedElement,
  );
  return <AddEquipmentForm equipment={equipment} />;
}
