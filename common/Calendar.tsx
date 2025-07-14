"use client";
import { useState } from "react";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = ({ itemList }: { itemList: Transaction[] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfWeek = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const getDayExpenses = (day: number) => {
    const dateStr = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    )
      .toISOString()
      .split("T")[0];
    return itemList
      .filter((t) => t.date === dateStr && t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const renderCalendar = () => {
    const today = new Date();
    const cells = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
      cells.push(
        <div
          key={`empty-${i}`}
          className="calendar-day empty bg-gray-200 shadow"
        ></div>
      );
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        day === today.getDate() &&
        currentDate.getMonth() === today.getMonth() &&
        currentDate.getFullYear() === today.getFullYear();
      const totalExpenses = getDayExpenses(day);
      cells.push(
        <div key={day} className={"calendar-day bg-white shadow "}>
          <div
            className={`day-number px-2 ${isToday ? " today font-bold " : ""}`}
          >
            {day}
          </div>
          {totalExpenses > 999 ? (
            <div
              className={`day-total flex w-full justify-end ${
                totalExpenses > 0 ? "expense" : ""
              }`}
            >
              ${(totalExpenses / 1000).toFixed(1)}K
            </div>
          ) : (
            <div
              className={`day-total flex w-full justify-end ${
                totalExpenses > 0 ? "expense" : ""
              }`}
            >
              ${totalExpenses.toFixed(0)}
            </div>
          )}
        </div>
      );
    }
    // Pad to always have 42 cells (6 weeks)
    while (cells.length < 42) {
      cells.push(
        <div
          key={`pad-${cells.length}`}
          className="calendar-day empty bg-gray-200"
        ></div>
      );
    }
    return cells;
  };

  const renderWeekDays = () => {
    return weekDays.map((day) => (
      <div key={day} className="day text-center font-semibold">
        {day}
      </div>
    ));
  };

  return (
    <div className="calendar-container flex-1  w-full h-full bg-gray-100 rounded-lg p-4 shadow">
      <div className="calendar-header flex justify-between items-center mb-4">
        <button
          className="text-blue-500 hover:underline"
          onClick={handlePrevMonth}
        >
          Previous Month
        </button>
        <div className="month-year text-gray-700">{`${currentDate.toLocaleString(
          "default",
          { month: "long" }
        )} ${currentDate.getFullYear()}`}</div>
        <button
          className="text-blue-500 hover:underline"
          onClick={handleNextMonth}
        >
          Next Month
        </button>
      </div>
      <div className="calendar ">
        <div className="week-days grid grid-cols-7 gap-1">
          {renderWeekDays()}
        </div>
        <div className="calendar-grid grid grid-cols-7 gap-1 text-sm">
          {/* Render calendar days here */}
          {renderCalendar()}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
