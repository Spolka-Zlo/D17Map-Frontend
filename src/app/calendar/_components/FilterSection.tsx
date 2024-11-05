import { SearchBar } from "@/components/SearchBar";
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

//setFilters prepared for the future use
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
    <div className="flex w-full content-center items-center justify-between gap-5 rounded-md bg-white/25 p-5">
      <SearchBar />
      <div className="border-r-4 border-primary p-2" />
      <div className="flex flex-grow gap-5 p-2 pl-4">
        {allFilters.map((filter) => (
          <FilterButton
            key={filter}
            filter={filter}
            isOn={filters.includes(filter)}
          />
        ))}
      </div>
      <div className="border-r-4 border-primary p-2" />
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
  );
}
