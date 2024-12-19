import { Dispatch, SetStateAction } from "react";
import { MapMenuExtraRoomFilterItem } from "./MapMenuExtraRoomFilterItem";

type MapMenuProps = {
  activeRooms: string[];
  setActiveRooms: Dispatch<SetStateAction<string[]>>;
};

export function MapMenu({ activeRooms, setActiveRooms }: MapMenuProps) {
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
