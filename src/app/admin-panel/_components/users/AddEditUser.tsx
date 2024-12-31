"use client";

import { useContext } from "react";
import { EditContext } from "../AdminPanelListItem";
import { AddEditUserForm } from "./AddEditUserForm";
import { User } from "@/schemas/usersSchema";

type AddEditUserProps = {
  users: User[];
  roles: string[];
};

export function AddEditUser({ users, roles }: AddEditUserProps) {
  const { editedElement } = useContext(EditContext);
  const user = users.find((user) => user.username === editedElement);
  return <AddEditUserForm key={user?.id} user={user} roles={roles} />;
}
