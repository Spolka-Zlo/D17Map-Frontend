import Frame from "./_components/Frame";
import { Rig } from "./_components/Rig";
import ThreeSixtyViewer from "./_components/ThreeSixtyViewer";

export default function Sphere() {
  return (
    <main>
      <div className="w-[70vw]">
        <h1>360 Street View</h1>
        <ThreeSixtyViewer />
      </div>
    </main>
  );
}
