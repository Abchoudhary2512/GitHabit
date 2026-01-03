"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { getDeviceId } from "@/lib/device";
import AddHabit from "@/components/AddHabit";
import HabitCard from "@/components/HabitCard";

export default function Page() {
  const [habits, setHabits] = useState<any[]>([]);
  const deviceId = getDeviceId();

  async function load() {
    const { data } = await supabase
      .from("habits")
      .select("*, habit_logs(date)")
      .eq("device_id", deviceId)
      .order("created_at");

    setHabits(data || []);
  }

  useEffect(() => {
    load();
  }, []);

  async function addHabit(name: string) {
    await supabase.from("habits").insert({
      name,
      device_id: deviceId,
    });
    load();
  }

 async function toggleDay(
  habitId: string,
  date: string,
  done: boolean
) {
  if (done) {
    await supabase
      .from("habit_logs")
      .delete()
      .eq("habit_id", habitId)
      .eq("date", date);
  } else {
    await supabase.from("habit_logs").insert({
      habit_id: habitId,
      date,
    });
  }

  load();
}

async function deleteHabit(habitId: string) {
  await supabase.from("habits").delete().eq("id", habitId);
  load();
}

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Habits</h1>
      <AddHabit onAdd={addHabit} />

      <div className="space-y-6">
        {habits.map(h => (
          <HabitCard key={h.id} habit={h} onToggle={toggleDay} onDelete={deleteHabit} />
        ))}
      </div>
    </main>
  );
}
