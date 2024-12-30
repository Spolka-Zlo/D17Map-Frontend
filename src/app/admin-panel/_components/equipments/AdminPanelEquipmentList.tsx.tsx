"use client";

import { useContext, useState } from "react";
import { EditContext } from "../AdminPanelListItem";
import { EditDeleteButtonsSection } from "../EditDeleteButtonsSection";
import { twMerge } from "tailwind-merge";
import { Equipment } from "@/schemas/equipmentSchemas";
import { ConfirmationModal } from "@/components/ConfirmationModal";
import { deleteEquipment } from "../../_actions/delete-equipment";
import { toast } from "sonner";

type AdminPanelEquipmentListProps = {
  equipments: Equipment[];
};

export function AdminPanelEquipmentList({
  equipments,
}: AdminPanelEquipmentListProps) {
  const { editedElement, setEditedElement } = useContext(EditContext);
  const [isConfirmationModalOpen, openCloseConfirmationModal] = useState(false);
  const [deletedEquipment, setDeletedEquipment] = useState<Equipment | null>(
    null,
  );
  return (
    <>
      <ul className="flex flex-col items-stretch justify-start gap-2 p-2">
        <span
          className="cursor-pointer rounded-md border-2 border-primary bg-white/0 p-2 text-center"
          onClick={() => setEditedElement(null)}
        >
          Wyczyść
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
              onDelete={() => {
                setDeletedEquipment(equipment);
                openCloseConfirmationModal(true);
              }}
            />
          </li>
        ))}
      </ul>
      {deletedEquipment && (
        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          onClose={() => {
            openCloseConfirmationModal(false);
          }}
          onConfirm={async () => {
            await deleteEquipment(deletedEquipment.name)
              .then(() => {
                toast.success("Sprzęt został usunięty");
              })
              .catch(() => {
                toast.error("Nie udało się usunąć sprzętu");
              });
            openCloseConfirmationModal(false);
          }}
          message={`Czy na pewno chcesz usunąć ${deletedEquipment.name}?`}
          title="Usuwanie sprzętu"
        />
      )}
    </>
  );
}
