"use client";
import { useState } from "react";

export default function AddHabit({ onAdd }: any) {
  const [name, setName] = useState("");

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (!name.trim()) return;
        onAdd(name);
        setName("");
      }}
      className="flex gap-2"
    >
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="New habit"
        className="flex-1 border rounded-lg px-3 py-2"
      />
      <button className="px-4 rounded-lg bg-black text-white">
        Add
      </button>
    </form>
  );
}
