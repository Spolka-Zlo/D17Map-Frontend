import { Dropdown } from "@/components/Dropdown";
import { Dispatch, SetStateAction } from "react";
import { MapMenuExtraRoomFilterItem } from "./MapMenuExtraRoomFilterItem";
import { Floor } from "@/schemas/floorsSchema";

type MapMenuProps = {
  floor: string;
  setFloor: Dispatch<SetStateAction<string>>;
  extraRoomsTypes: string[];
  activeRooms: string[];
  setActiveRooms: Dispatch<SetStateAction<string[]>>;
  floors: Floor[];
};

export function MapMenu({
  floor,
  setFloor,
  extraRoomsTypes,
  activeRooms,
  setActiveRooms,
  floors,
}: MapMenuProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-4">
      <div className="flex justify-center gap-5 p-2 pl-10">
        <MapMenuExtraRoomFilterItem
          type="WC"
          activeRooms={activeRooms}
          setActiveRooms={setActiveRooms}
        />
        <MapMenuExtraRoomFilterItem
          type="Inne"
          activeRooms={activeRooms}
          setActiveRooms={setActiveRooms}
        />
        <MapMenuExtraRoomFilterItem
          type="Klatki schodowe"
          activeRooms={activeRooms}
          setActiveRooms={setActiveRooms}
        />
        <MapMenuExtraRoomFilterItem
          type="Windy"
          activeRooms={activeRooms}
          setActiveRooms={setActiveRooms}
        />
      </div>
    </div>
  );
}
