import { Dropdown } from "@/components/Dropdown";
import { Dispatch, SetStateAction } from "react";

type MapMenuProps = {
  floor: string;
  setFloor: Dispatch<SetStateAction<string>>;
};

export function MapMenu({ floor, setFloor }: MapMenuProps) {
  return (
    <div className="absolute left-10 bottom-10 p-4">
      <Dropdown
        selected={floor}
        setSelected={setFloor}
        options={["Floor 0", "Floor 1", "Floor 2", "Floor 3", "Floor 4"]}
      />
    </div>
  );
}
