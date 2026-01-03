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
  const today = new Date();
  const completed = new Set(logs.map(l => l.date));


  const values = eachDayOfInterval({
    start: startOfYear(today),
    end: endOfYear(today),
  }).map(date => {
    const d = formatISO(date, { representation: "date" });
    return {
      date: d,
      count: completed.has(d) ? 1 : 0,
     future: isAfter(date, startOfDay(today)),
    };
  });

  return (
    <CalendarHeatmap
      startDate={startOfYear(today)}
      endDate={endOfYear(today)}
      values={values}
      classForValue={value => {
        if (!value) return "color-empty";
        if (value.future) return "color-future";
        return value.count === 1 ? "color-filled" : "color-empty";
      }}
      onClick={value => {
        if (!value || value.future) return;
        onToggle(habitId, value.date, value.count === 1);
      }}
    />
  );
}
