"use client";

import { createEquipment } from "../_actions/create-equipment";

export function AddEquipmentForm() {
  return (
    <form action={createEquipment}>
      <label htmlFor="id">ID</label>
      <input type="text" id="id" name="id" />
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" />
      <button type="submit">Add</button>
    </form>
  );
}
