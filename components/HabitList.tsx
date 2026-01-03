import HabitCard from "./HabitCard";

export default function HabitList({ habits, onToggle, onDelete }: any) {
  if (!habits.length)
    return <p className="text-gray-400">Add your first habit</p>;

  return (
    <div className="space-y-3">
      {habits.map((h: any) => (
        <HabitCard key={h.id} habit={h} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </div>
  );
}
