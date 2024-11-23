import { z } from "zod";

export type Equipment = {
  id: string;
  name: string;
};

export const getEquipmentsSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
  }),
);

export const createEquipmentSchema = z.object({
  name: z.string(),
});
