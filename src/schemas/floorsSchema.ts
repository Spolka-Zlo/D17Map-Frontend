import { z } from "zod";

export const floorSchema = z.object({
  id: z.string(),
  floorName: z.string(),
  buildingName: z.string(),
});

export const getFloorsSchema = z.array(floorSchema);

export const createFloorSchema = z.object({
  floorName: z.string(),
  buildingId: z.string(),
});

export type Floor = z.infer<typeof floorSchema>;
