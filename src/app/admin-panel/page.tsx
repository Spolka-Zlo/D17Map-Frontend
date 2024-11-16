import { getToken } from "@/auth/getToken";
import { AddEquipmentForm } from "./_components/AddEquipmentForm";

export default async function Classrooms() {
  const equipments = await getEquipments();
  return (
    <div className="flex flex-col gap-2 p-10">
      <h1>Equipments</h1>
      <AddEquipmentForm />

      <ul className="flex flex-col gap-4">
        {equipments.map((equipment) => (
          <li key={equipment.id}>{equipment.name}</li>
        ))}
      </ul>
    </div>
  );
}

async function getEquipments() {
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
