import { putClassrooms } from "@/app/admin-panel/_actions/put-classrooms";
import { Classroom } from "@/schemas/classroomSchemas";
import { Equipment } from "@/schemas/equipmentSchemas";
import { twMerge } from "tailwind-merge";

export function AddClassroomForm({
  equipments,
  classroom,
}: {
  equipments: Equipment[];
  classroom?: Classroom;
}) {
  console.log(classroom?.equipmentIds, "lala");
  return (
    <form
      className="flex h-fit w-[20vw] flex-col gap-3 rounded-md bg-white/25 p-5"
      action={putClassrooms}
    >
      {classroom?.id && <input type="hidden" name="id" value={classroom?.id} />}
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" defaultValue={classroom?.name} />
      <label htmlFor="description">Description</label>
      <input
        type="text"
        id="description"
        name="description"
        defaultValue={classroom?.description}
      />
      <label htmlFor="modelKey">Model Key</label>
      <input
        type="text"
        id="modelKey"
        name="modelKey"
        defaultValue={classroom?.modelKey}
      />
      <label htmlFor="capacity">Capacity</label>
      <input
        type="number"
        id="capacity"
        name="capacity"
        defaultValue={classroom?.capacity}
      />
      <h3>Equipment</h3>
      <ul className="flex h-28 flex-col gap-2 overflow-auto">
        {equipments.map((equipment) => (
          <li key={equipment.id + classroom?.id} className="flex gap-2">
            <input
              type="checkbox"
              id={equipment.id}
              name="equipmentIds[]"
              value={equipment.id}
              className={twMerge(
                "cursor-pointer",
                classroom?.equipmentIds.includes(equipment.id) && "text-accent",
              )}
              // checked={classroom?.equipmentIds.includes(equipment.id)}
              defaultChecked={classroom?.equipmentIds.includes(equipment.id)}
            />
            <label className="cursor-pointer" htmlFor={equipment.id}>
              {equipment.name}
            </label>
          </li>
        ))}
      </ul>
      <button type="submit">{classroom ? "Edit" : "Add"}</button>
    </form>
  );
}
