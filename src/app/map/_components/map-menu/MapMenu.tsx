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
    <div className="absolute bottom-0 left-10 p-4">
      <div className="flex justify-start gap-5">
        <Dropdown
          selected={floor}
          setSelected={setFloor}
          options={floors.map((f) => f.floorName)}
        />
        <div className="flex gap-5 p-2 pl-10">
          <MapMenuExtraRoomFilterItem
            type="TOILET"
            activeRooms={activeRooms}
            setActiveRooms={setActiveRooms}
          />
          <MapMenuExtraRoomFilterItem
            type="CAFETERIA"
            activeRooms={activeRooms}
            setActiveRooms={setActiveRooms}
          />
          <MapMenuExtraRoomFilterItem
            type="STAIRS"
            activeRooms={activeRooms}
            setActiveRooms={setActiveRooms}
          />
          <MapMenuExtraRoomFilterItem
            type="ELEVATOR"
            activeRooms={activeRooms}
            setActiveRooms={setActiveRooms}
          />
        </div>
      </div>
    </div>
  );
}
