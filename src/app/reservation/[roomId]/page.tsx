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
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      Room reservation page for room {roomId}
    </div>
  );
}
