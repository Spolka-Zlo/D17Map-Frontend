import Head from 'next/head'

type RoomReservationParams = {
    roomId: number
}

export default function RoomReservation({ params }: { params: RoomReservationParams }) {
    return (
        <div>
            <Head>
                <title>Room reservation for room</title>
            </Head>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                Room reservation page for room {params.roomId}
            </main>
        </div>
    )
}