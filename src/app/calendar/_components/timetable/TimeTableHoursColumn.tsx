import React from "react";

export function TimeTableHoursColumn() {
  const hours = Array.from({ length: 15 }, (_, i) => i);
  return (
    <div className="border-r-4 border-black p-2">
      <div className="border-b-4 border-black pb-3 text-center">Time</div>
      <div className="pt-2">
        {hours.map((hour) => (
          <React.Fragment key={hour}>
            <div className="h-2.5 border-t-2 border-black">{hour + 7}:00</div>
            <div className="h-2.5"></div>
            <div className="h-2.5"></div>
            <div className="h-2.5"></div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
