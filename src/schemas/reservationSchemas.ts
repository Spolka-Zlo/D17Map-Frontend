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

export const reverseReservationTypes: { [key: string]: string } = {
  CLASS: "Zajęcia",
  EXAM: "Egzamin",
  LECTURE: "Wykład",
  CONFERENCE: "Konferencja",
  TEST: "Kolokwium",
  CONSULTATIONS: "Konsultacje",
  STUDENT_CLUB_MEETING: "Spotkanie koła naukowego",
  EVENT: "Wydarzenie",
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

export type CycleReservationRequest = {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  classroomId: string;
  type: ReservationType;
  numberOfParticipants: number;
  recurringId: string;
  recurringEndDate: string;
  recurringType: string;
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
