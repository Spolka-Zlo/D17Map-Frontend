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
  return (
    <form
      className="flex h-fit w-[20vw] flex-col gap-3 rounded-md bg-white/25 p-5 maxMD:w-full"
      action={putClassrooms}
    >
      {classroom?.id && <input type="hidden" name="id" value={classroom?.id} />}
      <label htmlFor="name">Nazwa</label>
      <input type="text" id="name" name="name" defaultValue={classroom?.name} />
      <label htmlFor="description">Opis</label>
      <input
        type="text"
        id="description"
        name="description"
        defaultValue={classroom?.description}
      />
      <label htmlFor="modelKey">Klucz w modelu</label>
      <input
        type="text"
        id="modelKey"
        name="modelKey"
        defaultValue={classroom?.modelKey}
      />
      <label htmlFor="capacity">Pojemność</label>
      <input
        type="number"
        id="capacity"
        name="capacity"
        defaultValue={classroom?.capacity}
      />
      <label htmlFor="floorName">Poziom</label>
      <input
        type="text"
        id="floorName"
        name="floorName"
        defaultValue={classroom?.floorName}
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
              defaultChecked={classroom?.equipmentIds.includes(equipment.id)}
            />
            <label className="cursor-pointer" htmlFor={equipment.id}>
              {equipment.name}
            </label>
          </li>
        ))}
      </ul>
      <button type="submit">{classroom ? "Edytuj" : "Dodaj"}</button>
    </form>
  );
}
