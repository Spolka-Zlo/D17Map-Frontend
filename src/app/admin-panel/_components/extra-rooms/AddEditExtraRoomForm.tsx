import { ExtraRoom, createExtraRoomSchema } from "@/schemas/extraRoomSchemas";
import { putExtraRoom } from "../../_actions/put-extra-room";

export function AddEditExtraRoomForm({ extraRoom }: { extraRoom?: ExtraRoom }) {
  return (
    <form
      className="flex h-fit w-[20vw] flex-col justify-between gap-3 rounded-md bg-white/25 p-5"
      action={putExtraRoom}
    >
      {extraRoom?.modelKey && (
        <input type="hidden" name="modelKey" value={extraRoom?.modelKey} />
      )}
      <div className="flex flex-col gap-3">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={extraRoom?.name}
          required
        />

        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          defaultValue={extraRoom?.description}
        />

        <label htmlFor="type">Type</label>
        <input
          type="text"
          id="type"
          name="type"
          defaultValue={extraRoom?.type}
          required
        />
        <label htmlFor="modelKey">Model Key</label>
        <input
          type="text"
          id="modelKey"
          name="modelKey"
          defaultValue={extraRoom?.modelKey}
          required
        />
        <label htmlFor="floorName">Floor Name</label>
        <input
          type="text"
          id="floorName"
          name="floorName"
          defaultValue={extraRoom?.floorName}
          required
        />

        <label htmlFor="buildingName">Building Name</label>
        <input
          type="text"
          id="buildingName"
          name="buildingName"
          defaultValue={extraRoom?.buildingName}
          required
        />
      </div>

      <button type="submit" className="justify-self-end">
        {extraRoom ? "Edit" : "Add"}
      </button>
    </form>
  );
}
