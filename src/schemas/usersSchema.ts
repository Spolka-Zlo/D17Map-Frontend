import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  password: z.string(),
  roles: z.string(),
});

export type User = {
  id: string;
  username: string;
  password: string;
  roles: string;
};
