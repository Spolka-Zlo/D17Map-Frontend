import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Room Reservation Page",
};

export default async function RoomReservation(props: {
  params: Promise<{ roomId: number }>;
}) {
  const { roomId } = await props.params;
  return <main>Room reservation page for room {roomId}</main>;
}
