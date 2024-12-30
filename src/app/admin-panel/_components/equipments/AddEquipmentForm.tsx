import { Equipment } from "@/schemas/equipmentSchemas";
import { createEquipment } from "../../_actions/create-equipment";

export function AddEquipmentForm({ equipment }: { equipment?: Equipment }) {
  return (
    <form
      className="flex h-fit w-[20vw] flex-col justify-between gap-3 rounded-md bg-white/25 p-5"
      action={createEquipment}
    >
      {equipment?.id && <input type="hidden" name="id" value={equipment?.id} />}
      <div className="flex flex-col gap-3">
        <label htmlFor="name">Nazwa</label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={equipment?.name}
          required
        />
      </div>
      <button type="submit" className="justify-self-end">
        {equipment ? "Edytuj" : "Dodaj"}
      </button>
    </form>
  );
}
