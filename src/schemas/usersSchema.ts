import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  roles: z.array(z.string()),
});

export type User = {
  id: string;
  username: string;
  roles: string[];
};
