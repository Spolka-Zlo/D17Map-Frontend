"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { twMerge } from "tailwind-merge";
import { ComponentProps } from "react";

export type CalendarProps = ComponentProps<typeof DayPicker>;
export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={twMerge(
        "p-8 bg-white min-w-fit w-full rounded-lg text-primary z-10",
        className
      )}
      classNames={{
        months:
          "flex flex-col justify-center items-center sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-lg font-bold",
        nav: "space-x-1 flex items-center",
        nav_button: twMerge(
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "rounded-md w-12 maxXS:w-8 font-normal text-[1rem]",
        row: "flex w-full mt-2",
        cell: "h-12 maxXS:h-8 w-12 maxXS:w-8 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: twMerge(
          "h-12 maxXS:h-8 w-12 maxXS:w-8 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-secondary rounded-full transition-colors duration-300 text-primary hover:bg-secondary/50",
        day_today: "border-2 border-secondary rounded-full",
        day_outside: "opacity-50 aria-selected:opacity-30",
        day_disabled: " text-mapGrey/70",
        day_range_middle: "",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
