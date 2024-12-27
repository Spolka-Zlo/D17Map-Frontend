import { z } from "zod";

export type ReservationType = string;

export const reservationTypes: { [key: string]: string } = {
  Zajęcia: "CLASS",
  Egzamin: "EXAM",
  Wykład: "LECTURE",
  Konferencja: "CONFERENCE",
  Kolokwium: "TEST",
  Konsultacje: "CONSULTATIONS",
  "Spotkanie koła naukowego": "STUDENT_CLUB_MEETING",
  Wydarzenie: "EVENT",
} as const;

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
  recurringId?: string | null;
  recurringEndDate?: string | null;
  recurringType?: string | null;
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
  recurringId: z.optional(z.union([z.string(), z.null()])),
  recurringEndDate: z.optional(z.union([z.string(), z.null()])),
  recurringType: z.optional(z.union([z.string(), z.null()])),
});

export const getReservationsSchema = z.array(reservationSchema);
