import { MapSection } from "./_components/MapSection";

// let this empty map description be here for now
export default function Map() {
  return (
    <main>
      <div className="flex w-full flex-row justify-stretch">
        <MapSection />
        <div className="border-l-4 border-black"></div>
        <div className="p-10">
          <h1 className="text-2xl font-bold">Map</h1>
          <p>Map description</p>
        </div>
      </div>
    </main>
  );
}
