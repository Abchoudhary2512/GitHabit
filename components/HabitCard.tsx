"use client";

import HabitHeatmap from "./HabitHeatmap";

export default function HabitCard({
  habit,
  onToggle,
  onDelete,
}: {
  habit: any;
  onToggle: (habitId: string, date: string, done: boolean) => void;
  onDelete: (habitId: string) => void;
}) {
  return (
    <div className="relative border rounded-xl p-4 space-y-3">
    
      <button
        onClick={() => {
          if (confirm(`Delete "${habit.name}"?`)) {
            onDelete(habit.id);
          }
        }}
        className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
        aria-label="Delete habit"
      >
        ×
      </button>

      <h2 className="font-medium pr-6">{habit.name}</h2>

      <HabitHeatmap
        habitId={habit.id}
        logs={habit.habit_logs}
        onToggle={onToggle}
      />
    </div>
  );
}
