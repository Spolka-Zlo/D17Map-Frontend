"use server";

import { cookies } from "next/headers";

export async function getBuildingName() {
  const buildingName = cookies().get("buildingName");
  if (!buildingName) {
    return null;
  }
  return buildingName.value;
}
