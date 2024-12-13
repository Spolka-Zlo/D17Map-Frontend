import { Dispatch, SetStateAction } from "react";

type MapMenuExtraRoomFilterItemProps = {
  type: string;
  activeRooms: string[];
  setActiveRooms: Dispatch<SetStateAction<string[]>>;
};

export function MapMenuExtraRoomFilterItem({
  type,
  activeRooms,
  setActiveRooms,
}: MapMenuExtraRoomFilterItemProps) {
  return (
    <div
      className={`flex cursor-pointer gap-5 p-2 pl-10`}
      onClick={() => {
        if (activeRooms.includes(type)) {
          setActiveRooms(activeRooms.filter((room) => room !== type));
        } else {
          setActiveRooms([...activeRooms, type]);
        }
      }}
    >
      <span
        className={`h-4 w-4 rounded-full border-2 border-black ${
          type === "TOILET"
            ? "bg-toiletColor"
            : type === "CAFETERIA"
              ? "bg-cafeteriaColor"
              : type === "STAIRS"
                ? "bg-stairsColor"
                : type === "ELEVATOR"
                  ? "bg-elevatorColor"
                  : ""
        }`}
      />
      <span>{type}</span>
    </div>
  );
}
