import { z } from "zod";

export const extraRoomSchema = z.object({
  id: z.string(),
  name: z.string(),
  modelKey: z.string(),
  description: z.string(),
  type: z.string(),
  floorName: z.string(),
  buildingName: z.string(),
});

export const getExtraRoomsSchema = z.array(extraRoomSchema);

export type ExtraRoom = z.infer<typeof extraRoomSchema>;

export const createExtraRoomSchema = z.object({
  name: z.string(),
  modelKey: z.string(),
  description: z.string(),
  type: z.string(),
  floorName: z.string(),
});
