import Frame from "./_components/Frame";
import { Rig } from "./_components/Rig";
import ThreeSixtyViewer from "./_components/ThreeSixtyViewer";

export default function Sphere() {
  return (
    <main>
      <Frame id={"0"} name={""} author={""} bg={""} children={undefined} />
      <Rig />
      <div className="w-[70vw]">
        <h1>360 Street View</h1>
        <ThreeSixtyViewer />
      </div>
    </main>
  );
}
