import { putUser } from "../../_actions/put-user";
import { User } from "@/schemas/usersSchema";
import { twMerge } from "tailwind-merge";

type AddEditUserFormProps = {
  user?: User;
  roles: string[];
};

export function AddEditUserForm({ user, roles }: AddEditUserFormProps) {
  return (
    <form
      className="flex h-fit w-[20vw] flex-col gap-3 rounded-md bg-white/25 p-5"
      action={putUser}
    >
      {user?.id && <input type="hidden" name="id" value={user?.id} />}
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        defaultValue={user?.username}
      />
      <label htmlFor="password">Password</label>
      <input
        type="text"
        id="password"
        name="password"
        defaultValue={user?.password}
      />
      <label htmlFor="roles">Roles</label>
      <ul className="flex h-28 flex-col gap-2 overflow-auto">
        {roles.map((role) => (
          <li key={role} className="flex gap-2">
            <input
              type="checkbox"
              id={role}
              name="roleIds[]"
              value={role}
              className={twMerge(
                "cursor-pointer",
                user?.roles.includes(role) && "text-accent",
              )}
            />
            <label htmlFor={role}>{role}</label>
          </li>
        ))}
      </ul>
    </form>
  );
}
