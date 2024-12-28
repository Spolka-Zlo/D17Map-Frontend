import { ConfirmationModal } from "@/components/ConfirmationModal";
import { Role } from "@/schemas/roleSchema";
import { useContext, useState } from "react";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { EditContext } from "../AdminPanelListItem";
import { EditDeleteButtonsSection } from "../EditDeleteButtonsSection";
import { deleteRole } from "../../_actions/delete-role";

type AdminPanelRoleListProps = {
  roles: Role[];
};

export function AdminPanelRoleList({ roles }: AdminPanelRoleListProps) {
  const { editedElement, setEditedElement } = useContext(EditContext);
  const [isConfirmationModalOpen, openCloseConfirmationModal] = useState(false);
  const [deletedRole, setDeletedRole] = useState<Role | null>(null);

  return (
    <>
      <ul className="flex flex-col items-stretch justify-start gap-2 p-2">
        <span
          className="cursor-pointer rounded-md border-2 border-primary bg-white/0 p-2 text-center"
          onClick={() => setEditedElement(null)}
        >
          Clear
        </span>
        {roles.map((role) => (
          <li
            key={role.id}
            className={twMerge(
              "flex items-center justify-between gap-2 rounded-md border-2 border-primary bg-white/0 p-2",
              editedElement === role.name && "bg-accent/10",
            )}
          >
            <h3>{role.name}</h3>
            <EditDeleteButtonsSection
              onEdit={() => setEditedElement(role.name)}
              onDelete={() => {
                setDeletedRole(role);
                openCloseConfirmationModal(true);
              }}
            />
          </li>
        ))}
      </ul>
      {deletedRole && (
        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          onClose={() => {
            openCloseConfirmationModal(false);
          }}
          onConfirm={async () => {
            await deleteRole(deletedRole.name)
              .then(() => {
                toast.success("Rola została usunięta");
              })
              .catch(() => {
                toast.error("Nie udało się usunąć roli");
              });
            openCloseConfirmationModal(false);
          }}
          message={`Czy na pewno chcesz usunąć rolę ${deletedRole.name}?`}
          title="Usuwanie roli"
        />
      )}
    </>
  );
}
