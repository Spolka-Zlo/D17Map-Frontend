import { modifyReservation } from "@/shared-endpoints/modifyReservation";
import { addReservation } from "@/shared-endpoints/addReservation";
import { Reservation } from "@/schemas/reservationSchemas";

export function AddEditReservationForm({
  reservation,
}: {
  reservation?: Reservation;
}) {
  return (
    <form
      className="flex h-fit w-[20vw] flex-col justify-between gap-3 rounded-md bg-white/25 p-5"
      action={reservation ? modifyReservation : addReservation}
    >
      {reservation?.id && (
        <input type="hidden" name="id" value={reservation?.id} />
      )}
      <div className="flex flex-col gap-3">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={reservation?.title}
          required
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          defaultValue={reservation?.description}
        />
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          defaultValue={reservation?.date}
          required
        />
        <label htmlFor="startTime">Start Time</label>
        <input
          type="time"
          id="startTime"
          name="startTime"
          defaultValue={reservation?.startTime}
          required
        />
        <label htmlFor="endTime">End Time</label>
        <input
          type="time"
          id="endTime"
          name="endTime"
          defaultValue={reservation?.endTime}
          required
        />
        <label htmlFor="classroomId">Classroom</label>
        <input
          type="number"
          id="classroomId"
          name="classroomId"
          defaultValue={reservation?.classroom.id}
          required
        />
        <label htmlFor="type">Type</label>
        <input
          type="text"
          id="type"
          name="type"
          defaultValue={reservation?.type}
          required
        />
        <label htmlFor="numberOfParticipants">Number of Participants</label>
        <input
          type="number"
          id="numberOfParticipants"
          name="numberOfParticipants"
          defaultValue={reservation?.numberOfParticipants}
          required
        />
      </div>
      <button type="submit" className="justify-self-end">
        {reservation ? "Edit" : "Add"}
      </button>
    </form>
  );
}
