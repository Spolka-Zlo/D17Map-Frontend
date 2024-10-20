import z, { date, literal } from "zod";

const classRoomSchema = z.object({
  id: z.string(),
  name: z.string(),
  capacity: z.number(),
});

const eventTypesSchema = z.enum(["LECTURE", "EVENT", "EXAM"]);

const eventSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  date: date(),
  startTime: z.string(),
  endTime: z.string(),
  classRoom: classRoomSchema,
  type: eventTypesSchema,
  numberOfParticipants: z.number(),
});

export type Event = z.infer<typeof eventSchema>;
export type ClassRoom = z.infer<typeof classRoomSchema>;
export type EventTypes = z.infer<typeof eventTypesSchema>;

export default function Events() {
  return (
    <div>
      <h1>Events</h1>
    </div>
  );
}
