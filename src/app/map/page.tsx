import { Dropdown } from "@/components/Dropdown";
import { MapScene } from "./_components/MapScene";
import { MapSection } from "./_components/MapSection";

export default function Map() {
  return (
    <main>
      <div className="w-full flex flex-row justify-stretch">
        <MapSection />
        <div className="">
          <h1 className="text-2xl font-bold">Map</h1>
          <p>Map description</p>
        </div>
      </div>
    </main>
  );
}
