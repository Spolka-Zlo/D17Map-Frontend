"use client";

import { useContext } from "react";
import { EditContext } from "../AdminPanelListItem";
import { AddEditRoleForm } from "./AddEditRoleForm";
import { Role } from "@/schemas/roleSchema";
import { Classroom } from "@/schemas/classroomSchemas";
import { Floor } from "@/schemas/floorsSchema";

type AddEditRoleProps = {
  roles: Role[];
  floors: Floor[];
  classrooms: Classroom[];
};

export function AddEditRole({ roles, floors, classrooms }: AddEditRoleProps) {
  const { editedElement } = useContext(EditContext);
  const role = roles.find((role) => role.name === editedElement);
  return (
    <AddEditRoleForm
      key={role?.id}
      role={role}
      floors={floors}
      classrooms={classrooms}
    />
  );
}
