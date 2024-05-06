import { Dispatch, SetStateAction } from "react";

type CalendarTimeListProps = {
  timeList: TimeRanges[];
  selectedTime: TimeRanges;
  setSelectedTimeRange: Dispatch<SetStateAction<TimeRanges>>;
};

export function CalendarTimeList({
  timeList,
  selectedTime,
  setSelectedTimeRange,
}: CalendarTimeListProps) {
  return <div className="grid grid-cols-4 gap-2"></div>;
}
