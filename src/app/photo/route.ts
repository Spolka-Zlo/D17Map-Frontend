import { getBuildingName } from "@/auth/getBuildingName";
import { HOST } from "@/server-endpoints/host";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const classroomId = request.nextUrl.searchParams.get("classroomId");
  const buildingName = (await getBuildingName()) || "D17";
  const photo = await fetch(
    `${HOST}/buildings/${buildingName}/classrooms/${classroomId}/photo`,
    {
      method: "GET",
    },
  );
  const blob = await photo.blob();
  const headers = new Headers();
  headers.set("Content-Type", "image/jpeg");
  return new NextResponse(blob);
}
