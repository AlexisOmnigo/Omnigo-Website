"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = {
  className?: string
  selected?: Date
  onSelect?: (date: Date | undefined) => void
  disabled?: boolean
  initialFocus?: boolean
  month?: Date
  onMonthChange?: (date: Date) => void
  toDate?: Date
  fromDate?: Date
  mode?: "single" | "range" | "multiple"
}

function Calendar({
  className,
  selected,
  onSelect,
  disabled = false,
  month = new Date(),
  onMonthChange,
  ...props
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(month);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(selected);
  
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  
  // Generate array of days for the current month
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  
  // For padding at the beginning of the month
  const blankDaysAtStart = Array.from({ length: firstDayOfMonth }, (_, i) => null);
  
  // Create week rows for display
  const weeks = [];
  const allDays = [...blankDaysAtStart, ...daysArray];
  
  for (let i = 0; i < allDays.length; i += 7) {
    weeks.push(allDays.slice(i, i + 7));
  }
  
  const handlePrevMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() - 1);
    setCurrentMonth(newMonth);
    if (onMonthChange) onMonthChange(newMonth);
  };
  
  const handleNextMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + 1);
    setCurrentMonth(newMonth);
    if (onMonthChange) onMonthChange(newMonth);
  };
  
  const handleSelectDate = (day: number) => {
    if (disabled) return;
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(newDate);
    if (onSelect) onSelect(newDate);
  };
  
  const isSelectedDay = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth.getMonth() &&
      selectedDate.getFullYear() === currentMonth.getFullYear()
    );
  };
  
  const monthYear = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  return (
    <div className={cn("p-3", className)}>
      <div className="flex justify-center pt-1 relative items-center">
        <span className="text-sm font-medium">{monthYear}</span>
        <div className="space-x-1 flex items-center absolute right-1">
          <button
            onClick={handlePrevMonth}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
            )}
            disabled={disabled}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={handleNextMonth}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
            )}
            disabled={disabled}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="space-y-4 mt-4">
        <div className="flex">
          {weekdays.map((day) => (
            <div key={day} className="text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] text-center">
              {day}
            </div>
          ))}
        </div>
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex w-full mt-2">
            {week.map((day, dayIndex) => (
              <div
                key={`${weekIndex}-${dayIndex}`}
                className="h-9 w-9 text-center text-sm p-0 relative"
              >
                {day !== null ? (
                  <button
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "h-9 w-9 p-0 font-normal",
                      isSelectedDay(day) ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground" : ""
                    )}
                    onClick={() => handleSelectDate(day)}
                    disabled={disabled}
                  >
                    {day}
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

Calendar.displayName = "Calendar"

export { Calendar }
