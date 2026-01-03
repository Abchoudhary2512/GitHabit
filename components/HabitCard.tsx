import HabitHeatmap from "./HabitHeatmap";

export default function HabitCard({ habit, onToggle }: any) {
  return (
    <div className="border rounded-xl p-4 space-y-3">
      <h2 className="font-medium">{habit.name}</h2>

      <HabitHeatmap
        habitId={habit.id}
        logs={habit.habit_logs}
        onToggle={onToggle}
      />
    </div>
  );
}
