import { z } from "zod";

export const classroomSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  modelKey: z.string(),
  capacity: z.number(),
  equipmentIds: z.array(z.string()),
  floorName: z.string(),
  buildingName: z.string(),
});

export type Classroom = z.infer<typeof classroomSchema>;

export const getClassroomsSchema = z.array(classroomSchema);

export const createClassroomSchema = z.object({
  name: z.string(),
  description: z.string(),
  modelKey: z.string(),
  capacity: z.number(),
  equipmentIds: z.array(z.string()),
  floorName: z.string(),
  photo: z.string().optional(),
});
