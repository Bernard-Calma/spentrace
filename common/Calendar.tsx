"use client";

import { format } from "date-fns";
import { useEffect, useState } from "react";

const Calendar = ({ itemListProp }: { itemListProp: any[] }) => {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const [itemList, setItemList] = useState(itemListProp || []);

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
      .filter((t) => t.date === dateStr && t.type === "expense")
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  };

  const getDayIncomes = (day: number) => {
    const dateStr = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    )
      .toISOString()
      .split("T")[0];
    return itemList
      .filter((t) => t.date === dateStr && t.type === "income")
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
    const cells = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
      cells.push(
        <div
          key={`empty-${i}`}
          className="calendar-day empty bg-gray-100 shadow-sm rounded-lg"
        ></div>
      );
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        day === today.getDate() &&
        currentDate.getMonth() === today.getMonth() &&
        currentDate.getFullYear() === today.getFullYear();
      const totalExpense = getDayExpenses(day);
      const totalIncome = getDayIncomes(day);

      cells.push(
        <div
          key={day}
          className={
            "calendar-day flex flex-col text-sm bg-white shadow-sm rounded-lg p-2 pointer-events-none select-none"
          }
        >
          <div className={`day-number ${isToday ? " today" : ""}`}>{day}</div>
          {totalExpense !== 0 || totalIncome !== 0 ? (
            <div
              className={`day-total ${
                totalExpense > 0 ? "expense" : totalIncome > 0 ? "income" : ""
              } text-right`}
            >
              {totalExpense > 0
                ? totalExpense >= 1000
                  ? `$${(totalExpense / 1000).toFixed(1)}K`
                  : `$${totalExpense.toFixed(0)}`
                : totalIncome >= 1000
                ? `$${(totalIncome / 1000).toFixed(1)}K`
                : `$${totalIncome.toFixed(0)}`}
            </div>
          ) : (
            <div className="day-total text-right">$0</div>
          )}
        </div>
      );
    }
    // Pad to always have 42 cells (6 weeks)
    while (cells.length < 42) {
      cells.push(
        <div
          key={`pad-${cells.length}`}
          className="calendar-day empty bg-gray-100 shadow-sm rounded-lg"
        ></div>
      );
    }
    return cells;
  };

  // Update itemList when prop changesa
  useEffect(() => {
    setItemList(itemListProp || []);
  }, [itemListProp]);

  return (
    <div className="summary calendar-box flex flex-col flex-1 bg-white rounded-lg shadow-md p-2">
      <div className="calendar-header flex items-center justify-around mb-4">
        <button onClick={handlePrevMonth}>&lt;</button>
        <h2 className="subtitle text-lg font-semibold">
          {format(currentDate, "MMMM yyyy")}
        </h2>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="summary-content calendar flex flex-col w-1/2 m-auto">
        <div className="calendar-weekdays grid grid-cols-7 gap-2">
          {weekdays.map((day) => (
            <div
              key={day}
              className="calendar-weekday text-center font-semibold"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="calendar-grid grid grid-cols-7 gap-2">
          {renderCalendar()}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
