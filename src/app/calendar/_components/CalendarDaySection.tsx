import { Dispatch, SetStateAction } from "react";

type CalendarDaySectionProps = {
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
};

export function CalendarDaySection({
  isOpen,
  setIsOpen,
}: CalendarDaySectionProps) {
  return <div></div>;
}
