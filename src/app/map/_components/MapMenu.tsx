import { Dropdown } from "@/components/Dropdown";
import { Dispatch, SetStateAction } from "react";

type MapMenuProps = {
  floor: string;
  setFloor: Dispatch<SetStateAction<string>>;
};

export function MapMenu({ floor, setFloor }: MapMenuProps) {
  return (
    <div className="absolute bottom-0 left-10 p-4">
      <div className="flex justify-start gap-5">
        <Dropdown
          selected={floor}
          setSelected={setFloor}
          options={["Floor 0", "Floor 1", "Floor 2", "Floor 3", "Floor 4"]}
        />
        <div className="flex gap-5 p-2 pl-10">
          <span className="bg-toiletColor h-4 w-4 rounded-full border-2 border-black" />
          <span>Toilet</span>
          <span className="bg-cafeteriaColor h-4 w-4 rounded-full border-2 border-black" />
          <span>Cafeteria</span>
          <span className="bg-stairsColor h-4 w-4 rounded-full border-2 border-black" />
          <span>Stairs</span>
          <span className="bg-elevatorColor h-4 w-4 rounded-full border-2 border-black" />
          <span>Elevator</span>
        </div>
      </div>
    </div>
  );
}
