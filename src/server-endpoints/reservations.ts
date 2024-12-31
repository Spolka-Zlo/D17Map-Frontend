import { HOST } from "./host";
import { cookies } from "next/headers";

const buildingName = cookies().get("buildingName")?.value || "D17";

export const ADD_RESERVATION_URL = `${HOST}/buildings/${buildingName}/reservations`;
export const ADD_RECURRING_RESERVATION_URL = `${HOST}/buildings/${buildingName}/reservations/recurringReservations`;
export const MODIFY_RESERVATION_URL = `${HOST}/buildings/${buildingName}/reservations/`;
export const DELETE_RESERVATION_URL = `${HOST}/buildings/${buildingName}/reservations/`;
export const ACCEPT_RECURRING_RESERVATION_URL = `${HOST}/buildings/${buildingName}/reservations/recurringReservations/skip-collisions`;
