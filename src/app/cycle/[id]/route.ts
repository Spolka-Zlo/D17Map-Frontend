import { getBuildingName } from "@/auth/getBuildingName";
import { getToken } from "@/auth/getToken";
import { HOST } from "@/server-endpoints/host";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  const buildingName = (await getBuildingName()) || "D17";
  const token = await getToken();
  const response = await fetch(
    `${HOST}/buildings/${buildingName}/reservations/recurringReservations/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    return NextResponse.json(
      {
        error: "Error in fetching cycle",
      },
      {
        status: response.status,
      },
    );
  }
  const cycle = await response.json();
  return NextResponse.json(cycle);
}
