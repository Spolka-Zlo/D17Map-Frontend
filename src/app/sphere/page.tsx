// import { getToken } from "@/auth/getToken";
// import { ThreeSixtyViewer } from "./_components/ThreeSixtyViewer";
// import { HOST } from "@/server-endpoints/host";

export default async function Sphere() {
  return (
    <main>
      <div className="w-[70vw]">
        <h1>360 Street View</h1>
      </div>
    </main>
  );
}
// export default async function Sphere() {
//   const token = await getToken();
//   const photo = await fetch(
//     `${HOST}/classrooms/7f000101-93ca-1969-8193-caf979d3000c/photo`,
//     {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     },
//   );
//   const blob = await photo.blob();
//   const url = URL.createObjectURL(blob);
//   return (
//     <main>
//       <div className="w-[70vw]">
//         <h1>360 Street View</h1>
//         <ThreeSixtyViewer  />
//       </div>
//     </main>
//   );
// }
