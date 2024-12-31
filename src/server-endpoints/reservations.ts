import { getBuildingName } from "@/auth/getBuildingName";
import { HOST } from "./host";

const buildingName = await getBuildingName();

export const ADD_RESERVATION_URL = `${HOST}/buildings/${buildingName}/reservations`;
export const ADD_RECURRING_RESERVATION_URL = `${HOST}/buildings/${buildingName}/reservations/recurringReservations`;
export const MODIFY_RESERVATION_URL = `${HOST}/buildings/${buildingName}/reservations/`;
export const DELETE_RESERVATION_URL = `${HOST}/buildings/${buildingName}/reservations/`;
export const ACCEPT_RECURRING_RESERVATION_URL = `${HOST}/buildings/${buildingName}/reservations/recurringReservations/skip-collisions`;
