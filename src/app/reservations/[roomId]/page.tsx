export default function RoomReservation({
  params,
}: {
  params: { roomId: number };
}) {
  const { roomId } = params;
  return <main>Room reservation page for room {roomId}</main>;
}
