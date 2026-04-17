'use client';
export default function CalendarGrid({ onDateSelect }: { onDateSelect: (date: Date) => void }) {
  return (
    <div className="calendar-grid">
      <button onClick={() => onDateSelect(new Date())}>Select Today</button>
    </div>
  );
}
