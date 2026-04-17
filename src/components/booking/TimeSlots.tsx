'use client';
export default function TimeSlots({ duration, onSlotSelect }: { duration: 30 | 60, onSlotSelect: (time: string) => void }) {
  return (
    <div className="time-slots">
      <button onClick={() => onSlotSelect("10:00 AM")}>10:00 AM</button>
      <button onClick={() => onSlotSelect("10:30 AM")}>10:30 AM</button>
    </div>
  );
}
