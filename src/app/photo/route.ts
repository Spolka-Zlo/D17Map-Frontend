import { getToken } from "@/auth/getToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const classroomId = request.nextUrl.searchParams.get("classroomId");
  console.log("GET");
  const token = await getToken();
  const photo = await fetch(
    `http://localhost:8080/classrooms/${classroomId}/photo`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const blob = await photo.blob();
  const headers = new Headers();
  headers.set("Content-Type", "image/jpeg");
  console.log("blob", blob);
  return new NextResponse(blob);
}
