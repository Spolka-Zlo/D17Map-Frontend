import { MapScene } from "./_components/MapScene";

export default function Map() {
  const fileUrl = "/gltf/1floor3D2.glb";
  return (
    <main>
      <div className="w-full flex flex-row justify-stretch">
        <div className="relative">
          <div className="h-[70vh] w-[60vw]">
            <MapScene fileUrl={fileUrl} />
          </div>
          <div className="absolute right-20 top-0 p-4 bg-white/25">
            <h1 className="text-2xl font-bold">Floor 1</h1>
            <p>Floor description</p>
          </div>
        </div>
        <div className="">
          <h1 className="text-2xl font-bold">Map</h1>
          <p>Map description</p>
        </div>
      </div>
    </main>
  );
}
