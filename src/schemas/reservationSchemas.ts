import { z } from "zod";

export type ReservationType = string;

export type Reservation = {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: number;
  endTime: number;
  classroom: {
    id: string;
    name: string;
    modelKey: string;
    capacity: number;
  };
  type: ReservationType;
  numberOfParticipants: number;
};

export const reservationSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  classroom: z.object({
    id: z.string(),
    name: z.string(),
    modelKey: z.string(),
    capacity: z.number(),
  }),
  type: z.string(),
  numberOfParticipants: z.number(),
});

export const getReservationsSchema = z.array(reservationSchema);
