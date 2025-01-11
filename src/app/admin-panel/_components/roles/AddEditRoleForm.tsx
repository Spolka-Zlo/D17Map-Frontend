"use client";

import { Role } from "@/schemas/roleSchema";
import { putRole } from "../../_actions/put-role";
import { Classroom } from "@/schemas/classroomSchemas";
import { Floor } from "@/schemas/floorsSchema";

type RoleFormProps = {
  role?: Role;
  floors: Floor[];
  classrooms: Classroom[];
};

export function AddEditRoleForm({ role, floors, classrooms }: RoleFormProps) {
  function isAllDefaultChecked(role: Role | undefined) {
    if (!role) return false;
    if (role.included) {
      return role.included.all;
    }
    if (role.excluded) {
      return role.excluded.all;
    }
    return false;
  }
  return (
    <form
      className="flex h-fit w-[20vw] flex-col justify-between gap-3 rounded-md bg-white/25 p-5 maxMD:w-full"
      action={putRole}
    >
      {role?.id && <input type="hidden" name="id" value={role?.id} />}
      <div className="flex flex-col gap-3">
        <label htmlFor="name">Nazwa</label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={role?.name}
          required
        />
      </div>
      <h3>Permisje</h3>
      <div className="flex flex-col gap-3">
        <div className="flex justify-start gap-5">
          <div className="flex gap-1">
            <label htmlFor="included">Włączone</label>
            <input
              type="radio"
              id="included"
              name="includedExcluded"
              defaultChecked={!!role?.included}
            />
          </div>
          <div className="flex gap-1">
            <label htmlFor="excluded">Wyłączone</label>
            <input
              type="radio"
              id="excluded"
              name="includedExcluded"
              defaultChecked={!!role?.excluded}
            />
          </div>
        </div>
        <div className="flex gap-1">
          <input
            type="checkbox"
            id="all"
            name="All"
            defaultChecked={isAllDefaultChecked(role)}
          />
          <label htmlFor="all">All</label>
        </div>
        <div className="flex flex-col gap-1">
          <h4>Poziomy</h4>
          <ul className="flex h-28 flex-col gap-2 overflow-auto">
            {floors.map((floor) => (
              <li key={floor.floorName + role?.id} className="flex gap-2">
                <input
                  type="checkbox"
                  id={floor.floorName}
                  name="floorIds[]"
                  value={floor.floorName}
                  className={floor.floorName}
                  defaultChecked={role?.included?.floors?.includes(
                    floor.floorName,
                  )}
                />
                <label className="cursor-pointer" htmlFor={floor.floorName}>
                  {floor.floorName}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-1">
          <h4>Sale</h4>
          <ul className="flex h-28 flex-col gap-2 overflow-auto">
            {classrooms.map((classroom) => (
              <li key={classroom.id + role?.id} className="flex gap-2">
                <input
                  type="checkbox"
                  id={classroom.id}
                  name="classroomIds[]"
                  value={classroom.id}
                  className={classroom.id}
                  defaultChecked={role?.included?.classrooms?.includes(
                    classroom.name,
                  )}
                />
                <label className="cursor-pointer" htmlFor={classroom.id}>
                  {classroom.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button type="submit">{role ? "Edytuj" : "Dodaj"}</button>
    </form>
  );
}
