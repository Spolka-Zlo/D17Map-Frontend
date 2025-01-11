import { Dispatch, SetStateAction } from "react";
import { FilterButton } from "./FilterButton";
import { Dropdown } from "@/components/Dropdown";

type FilterSectionProps = {
  allFilters: string[];
  filters: string[];
  setFilters: Dispatch<SetStateAction<string[]>>;
  openCloseReservationModal: Dispatch<SetStateAction<boolean>>;
  selectedRoom: string;
  setSelectedRoom: Dispatch<SetStateAction<string>>;
  availableRooms: string[];
};

export function FilterSection({
  allFilters,
  filters,
  setFilters,
  openCloseReservationModal,
  selectedRoom,
  setSelectedRoom,
  availableRooms,
}: FilterSectionProps) {
  return (
    <div className="maxXL:flex-col flex w-full content-center items-center justify-between gap-5 rounded-md bg-white/25 p-5">
      <div className="scrollbar maxXL:flex-wrap maxXL:justify-around maxXL:gap-3 flex flex-grow gap-5 overflow-auto p-2 maxLG:pl-4">
        {allFilters.map((filter) => (
          <FilterButton
            key={filter}
            filter={filter}
            isOn={filters.includes(filter)}
            onClickHandler={() =>
              setFilters(
                filters.includes(filter)
                  ? filters.filter((f) => f !== filter)
                  : [...filters, filter],
              )
            }
          />
        ))}
      </div>
      <div className="maxXL:hidden border-r-4 border-primary p-2" />
      <div className="flex items-center justify-center gap-5 lg:pl-10">
        <Dropdown
          selected={selectedRoom}
          setSelected={setSelectedRoom}
          options={availableRooms}
          className="w-24"
        />
        <button
          onClick={() => openCloseReservationModal(true)}
          className="h-11 w-11 rounded-md border-b-2 border-l-2 border-primary bg-accent text-center text-4xl text-primary"
        >
          +
        </button>
      </div>
    </div>
  );
}
