import { Dispatch, SetStateAction } from "react";

type MapMenuExtraRoomFilterItemProps = {
  type: string;
  activeRooms: string[];
  setActiveRooms: Dispatch<SetStateAction<string[]>>;
};

function setColor(type: string, activeRooms: string[]) {
  if (activeRooms.includes(type)) {
    if (type === "WC") {
      return "bg-toiletColor";
    }
    if (type === "Inne") {
      return "bg-othersColor";
    }
    if (type === "Klatki schodowe") {
      return "bg-stairsColor";
    }
    if (type === "Windy") {
      return "bg-elevatorColor";
    }
  } else {
    return "bg-white";
  }
}

export function MapMenuExtraRoomFilterItem({
  type,
  activeRooms,
  setActiveRooms,
}: MapMenuExtraRoomFilterItemProps) {
  return (
    <div
      className={`flex cursor-pointer items-center gap-5 p-2 pl-10`}
      onClick={() => {
        if (activeRooms.includes(type)) {
          setActiveRooms(activeRooms.filter((room) => room !== type));
        } else {
          setActiveRooms([...activeRooms, type]);
        }
      }}
    >
      <span
        className={`h-4 w-4 rounded-full border-2 border-black ${setColor(type, activeRooms)}`}
      />
      <span>{type}</span>
    </div>
  );
}
