import { z } from "zod";

const includedExcludedSchema = z.optional(
  z.object({
    all: z.boolean(),
    floors: z.optional(z.array(z.string())),
    classrooms: z.optional(z.array(z.string())),
  }),
);

export const roleSchema = z.object({
  id: z.string(),
  name: z.string(),
  included: includedExcludedSchema,
  excluded: includedExcludedSchema,
});

export const getRolesSchema = z.array(roleSchema);

export type Role = z.infer<typeof roleSchema>;
