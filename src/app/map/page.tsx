import { MapScene } from "./_components/MapScene";

export default function Map() {
  const fileUrl = "/gltf/1floor3D2.glb";
  return (
    <main>
      <div className="w-full flex flex-row justify-stretch">
        <div className="h-[70vh] w-[60vw]">
          <MapScene fileUrl={fileUrl} />
        </div>
        <div className="">
          <h1 className="text-2xl font-bold">Map</h1>
          <p>Map description</p>
        </div>
      </div>
    </main>
  );
}
