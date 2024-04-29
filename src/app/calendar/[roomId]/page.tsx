import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Room Reservation Page",
};

export default function RoomReservation({
  params,
}: {
  params: { roomId: number };
}) {
  const { roomId } = params;
  return <main>Room reservation page for room {roomId}</main>;
}
