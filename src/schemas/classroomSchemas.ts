import { z } from "zod";

export type Classroom = {
  id: string;
  name: string;
  description: string;
  modelKey: string;
  capacity: number;
  equipmentIds: string[];
};

export const getClassroomsSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    modelKey: z.string(),
    capacity: z.number(),
    equipmentIds: z.array(z.string()),
  }),
);

export const createClassroomSchema = z.object({
  name: z.string(),
  description: z.string(),
  modelKey: z.string(),
  capacity: z.number(),
  equipmentIds: z.array(z.string()),
});
