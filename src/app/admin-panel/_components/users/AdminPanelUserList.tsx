"use client";

import { useContext, useState } from "react";
import { EditContext } from "../AdminPanelListItem";
import { EditDeleteButtonsSection } from "../EditDeleteButtonsSection";
import { twMerge } from "tailwind-merge";
import { User } from "@/schemas/usersSchema";
import { ConfirmationModal } from "@/components/ConfirmationModal";
import { deleteUser } from "../../_actions/delete-user";
import { toast } from "sonner";

type AdminPanelUserListProps = {
  users: User[];
};

export function AdminPanelUserList({ users }: AdminPanelUserListProps) {
  const { editedElement, setEditedElement } = useContext(EditContext);
  const [isConfirmationModalOpen, openCloseConfirmationModal] = useState(false);
  const [deletedUser, setDeletedUser] = useState<User | null>(null);

  return (
    <>
      <ul className="flex flex-col items-stretch justify-start gap-2 p-2">
        <span
          className="cursor-pointer rounded-md border-2 border-primary bg-white/0 p-2 text-center"
          onClick={() => setEditedElement(null)}
        >
          Wyczyść
        </span>
        {users.map((user) => (
          <li
            key={user.id}
            className={twMerge(
              "flex items-center justify-between gap-2 rounded-md border-2 border-primary bg-white/0 p-2",
              editedElement === user.username && "bg-accent/10",
            )}
          >
            <h3>{user.username}</h3>
            <EditDeleteButtonsSection
              onEdit={() => setEditedElement(user.username)}
              onDelete={() => {
                setDeletedUser(user);
                openCloseConfirmationModal(true);
              }}
            />
          </li>
        ))}
      </ul>
      {deletedUser && (
        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          onClose={() => {
            openCloseConfirmationModal(false);
          }}
          onConfirm={async () => {
            await deleteUser(deletedUser.id)
              .then(() => {
                toast.success("User deleted successfully");
              })
              .catch(() => {
                toast.error("Failed to delete user");
              });
          }}
          title="Usuń użytkownika"
          message="Czy jesteś pewien, że chcesz usunąć użytkownika?"
          cancelText="Anuluj"
        />
      )}
    </>
  );
}
