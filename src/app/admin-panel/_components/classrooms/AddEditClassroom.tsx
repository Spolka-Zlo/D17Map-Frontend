"use client";

import { useContext } from "react";
import { EditContext } from "../AdminPanelListItem";
import { AddClassroomForm } from "./AddClassroomForm";
import { Classroom } from "@/schemas/classroomSchemas";
import { Equipment } from "@/schemas/equipmentSchemas";

export function AddEditClassroom({
  classrooms,
  equipments,
}: {
  classrooms: Classroom[];
  equipments: Equipment[];
}) {
  const { editedElement } = useContext(EditContext);
  const classroom = classrooms.find(
    (classroom) => classroom.name === editedElement,
  );
  return <AddClassroomForm classroom={classroom} equipments={equipments} />;
}
