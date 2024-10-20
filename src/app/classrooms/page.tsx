import { getToken } from "@/auth/getToken";
import { AddEquipmentForm } from "./_components/AddEquipmentForm";

export default async function Classrooms() {
  const classRooms = await getClassrooms();
  return (
    <div>
      <h1>Classrooms</h1>
      <AddEquipmentForm />

      <ul>
        {classRooms.map((classRoom) => (
          <li key={classRoom.id}>{classRoom.name}</li>
        ))}
      </ul>
    </div>
  );
}

async function getClassrooms() {
  const token = await getToken();

  if (!token) {
    throw new Error("Not authenticated");
  }

  const response = await fetch("http://localhost:8080/equipments", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json() as Promise<{ id: string; name: string }[]>;
}
