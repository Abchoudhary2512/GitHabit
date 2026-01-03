"use client";

import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import {
  eachDayOfInterval,
  startOfYear,
  endOfYear,
  formatISO,
  isAfter,
  startOfDay,
} from "date-fns";

type Log = { date: string };

export default function HabitHeatmap({
  habitId,
  logs,
  onToggle,
}: {
  habitId: string;
  logs: Log[];
  onToggle: (habitId: string, date: string, done: boolean) => void;
}) {
  const today = startOfDay(new Date());
  const todayStr = formatISO(today, { representation: "date" });

  const completed = new Set(logs.map(l => l.date));

  const values = eachDayOfInterval({
    start: startOfYear(today),
    end: endOfYear(today),
  }).map(date => {
    const d = formatISO(date, { representation: "date" });
    return {
      date: d,
      count: completed.has(d) ? 1 : 0,
      isFuture: isAfter(date, today), // only disable strictly future
      isToday: d === todayStr,
    };
  });

  return (
    <CalendarHeatmap
      startDate={startOfYear(today)}
      endDate={endOfYear(today)}
      values={values}
      classForValue={value => {
        if (!value) return "color-empty";
        if (value.isFuture) return "color-future";

        let cls = value.count === 1 ? "color-filled" : "color-empty";
        if (value.isToday) cls += " color-today";

        return cls;
      }}
      onClick={value => {
        if (!value || value.isFuture) return;
        onToggle(habitId, value.date, value.count === 1);
      }}
    />
  );
}
