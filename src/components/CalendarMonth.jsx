// Calendar Month Component with Modern Theme
import { useMemo, useState } from "react";
import { createPortal } from "react-dom";

const DAYS = ["MIN", "SEN", "SEL", "RAB", "KAM", "JUM", "SAB"];
const DAYS_FULL = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];
const MONTHS_ID = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

// Tooltip Component with Portal for correct positioning
function Tooltip({ holiday, visible, x, y }) {
  if (!visible || !holiday) return null;

  const colorClass =
    holiday.category === "public"
      ? "border-l-4 border-red-500"
      : holiday.category === "joint"
        ? "border-l-4 border-amber-900"
        : "border-l-4 border-blue-500";

  const categoryLabel =
    holiday.category === "public"
      ? "Libur Nasional"
      : holiday.category === "joint"
        ? "Cuti Bersama"
        : "Libur Sekolah";

  // Calculate position to keep tooltip on screen
  const tooltipWidth = 280;
  const tooltipHeight = 100;
  const padding = 16;

  let left = x + 12;
  let top = y + 12;

  // Prevent going off right edge
  if (left + tooltipWidth > window.innerWidth - padding) {
    left = x - tooltipWidth - 12;
  }

  // Prevent going off bottom edge
  if (top + tooltipHeight > window.innerHeight - padding) {
    top = y - tooltipHeight - 12;
  }

  // Prevent going off left edge
  if (left < padding) {
    left = padding;
  }

  // Prevent going off top edge
  if (top < padding) {
    top = padding;
  }

  const tooltipContent = (
    <div
      className={`fixed z-[9999] rounded-xl border border-border bg-popover p-3 shadow-xl max-w-[280px] ${colorClass} pointer-events-none animate-fade-scale`}
      style={{
        left: `${left}px`,
        top: `${top}px`,
      }}
    >
      <div className="text-sm font-semibold text-popover-foreground mb-1">
        {holiday.name}
      </div>
      <div className="text-xs text-muted-foreground mb-2 line-clamp-2">
        {holiday.description}
      </div>
      <div className="flex items-center gap-1.5">
        <span
          className={`w-2 h-2 rounded-full ${
            holiday.category === "public"
              ? "bg-red-500"
              : holiday.category === "joint"
                ? "bg-amber-500"
                : "bg-blue-500"
          }`}
        />
        <span className="text-xs text-muted-foreground">{categoryLabel}</span>
      </div>
    </div>
  );

  return createPortal(tooltipContent, document.body);
}

export default function CalendarMonth({
  year,
  month,
  holidays,
  selectedCategory,
  currentDate,
  viewMode = "mini",
}) {
  const [tooltip, setTooltip] = useState({
    visible: false,
    holiday: null,
    x: 0,
    y: 0,
  });

  // Get holidays for this month
  const monthHolidays = useMemo(() => {
    return holidays.filter((h) => {
      const date = new Date(h.date);
      const isRightMonth =
        date.getMonth() === month && date.getFullYear() === year;
      if (!isRightMonth) return false;
      if (selectedCategory === "all") return true;
      return h.category === selectedCategory;
    });
  }, [holidays, month, year, selectedCategory]);

  const getHolidayForDay = (day) => {
    return monthHolidays.find((h) => {
      const date = new Date(h.date);
      return date.getDate() === day;
    });
  };

  const getHolidayColors = (day) => {
    const dayHolidays = monthHolidays.filter((h) => {
      const date = new Date(h.date);
      return date.getDate() === day;
    });

    return dayHolidays.map((h) => {
      switch (h.category) {
        case "public":
          return "bg-red-500";
        case "joint":
          return "bg-amber-500";
        case "school":
          return "bg-blue-500";
        default:
          return "bg-gray-400";
      }
    });
  };
  const hasHoliday = (day) => {
    return monthHolidays.some((h) => {
      const date = new Date(h.date);
      return date.getDate() === day;
    });
  };

  const getHolidayInfo = (day) => {
    return monthHolidays.find((h) => {
      const date = new Date(h.date);
      return date.getDate() === day;
    });
  };

  const isToday = (day) => {
    if (!currentDate) return false;
    return (
      year === currentDate.year &&
      month === currentDate.month &&
      day === currentDate.date
    );
  };

  const isPastDate = (day) => {
    const checkDate = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return checkDate < today;
  };

  const handleMouseEnter = (day, e) => {
    const holiday = getHolidayForDay(day);
    if (holiday) {
      setTooltip({
        visible: true,
        holiday,
        x: e.clientX,
        y: e.clientY,
      });
    }
  };

  const handleMouseMove = (e) => {
    if (tooltip.visible) {
      setTooltip((prev) => ({ ...prev, x: e.clientX, y: e.clientY }));
    }
  };

  const handleMouseLeave = () => {
    setTooltip({ visible: false, holiday: null, x: 0, y: 0 });
  };

  // Calendar grid calculations
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const generateDays = () => {
    const days = [];
    // Previous month padding
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        isCurrentMonth: false,
        isPadding: true,
      });
    }
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, isCurrentMonth: true, isPadding: false });
    }
    // Next month padding
    const remainingCells = 42 - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      days.push({ day: i, isCurrentMonth: false, isPadding: true });
    }
    return days;
  };

  const days = generateDays();
  const dayHasHoliday = (day) => hasHoliday(day);

  // Get cell background color
  const getCellBgColor = (item, isCurrentDay, isPast, isHoliday) => {
    if (isCurrentDay) return "bg-blue-500/10 dark:bg-blue-500/20";
    if (isHoliday && !isPast) {
      const holidayInfo = getHolidayInfo(item.day);
      if (holidayInfo?.category === "public")
        return "bg-red-500/5 dark:bg-red-500/10";
      if (holidayInfo?.category === "joint")
        return "bg-amber-500/5 dark:bg-amber-500/10";
    }
    if (isPast) return "bg-muted/30";
    return "bg-transparent";
  };

  // Get text color - using CSS variables for proper dark mode support
  const getTextColor = (item, isCurrentDay, isPast, isHoliday, dayOfWeek) => {
    const isSunday = dayOfWeek === 0;
    const isSaturday = dayOfWeek === 6;

    if (!item.isCurrentMonth) return "text-muted-foreground/40";
    if (isCurrentDay) return "text-blue-600 dark:text-blue-400 font-bold";
    if (isPast) return "text-muted-foreground/60";
    if (isSunday) return "text-red-500";
    if (isSaturday) return "text-blue-500";
    if (isHoliday) {
      const holidayInfo = getHolidayInfo(item.day);
      if (holidayInfo?.category === "public")
        return "text-red-600 dark:text-red-400 font-medium";
      if (holidayInfo?.category === "joint")
        return "text-amber-600 dark:text-amber-400 font-medium";
    }
    return "text-foreground";
  };

  // FULL VIEW MODE
  if (viewMode === "full") {
    return (
      <>
        <Tooltip
          holiday={tooltip.holiday}
          visible={tooltip.visible}
          x={tooltip.x}
          y={tooltip.y}
        />

        <div className="rounded-2xl border-2 border-border bg-card shadow-lg p-6">
          {/* Month Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              {MONTHS_ID[month]} {year}
            </h2>
            <p className="text-sm mt-1 text-muted-foreground">
              {monthHolidays.length} hari libur
            </p>
          </div>

          {/* Day Headers - using CSS classes for dark mode instead of prop */}
          <div className="grid grid-cols-7 gap-0 mb-2">
            {DAYS_FULL.map((day, idx) => (
              <div
                key={day}
                className={`text-center text-sm font-semibold py-2 ${
                  idx === 0
                    ? "text-red-500"
                    : idx === 6
                      ? "text-blue-500"
                      : "text-foreground"
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 border border-border rounded-xl overflow-hidden">
            {days.map((item, idx) => {
              const colors = item.isCurrentMonth
                ? getHolidayColors(item.day)
                : [];
              const hasHolidays = colors.length > 0;
              const isHoliday = item.isCurrentMonth && dayHasHoliday(item.day);
              const isCurrentDay = item.isCurrentMonth && isToday(item.day);
              const isPast = item.isCurrentMonth && isPastDate(item.day);
              const dayOfWeek = idx % 7;

              const bgColor = getCellBgColor(
                item,
                isCurrentDay,
                isPast,
                isHoliday,
              );
              const textColor = getTextColor(
                item,
                isCurrentDay,
                isPast,
                isHoliday,
                dayOfWeek,
              );

              return (
                <div
                  key={idx}
                  className={`
                    min-h-[100px] p-2 relative border-b border-r border-border
                    ${bgColor}
                    ${item.isPadding ? "bg-muted/20" : ""}
                    ${isHoliday ? "cursor-pointer" : "cursor-default"}
                    hover:bg-muted/50 transition-colors duration-150
                  `}
                  onMouseEnter={(e) =>
                    isHoliday && handleMouseEnter(item.day, e)
                  }
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Day Number */}
                  <span className={`text-sm ${textColor}`}>{item.day}</span>

                  {/* Holiday Dots */}
                  {hasHolidays && (
                    <div className="flex gap-1 mt-1 flex-wrap">
                      {colors.slice(0, 4).map((color, i) => (
                        <span
                          key={i}
                          className={`w-2 h-2 rounded-full ${color}`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Holiday Names */}
                  {isHoliday && (
                    <div className="mt-1 space-y-0.5">
                      {monthHolidays
                        .filter((h) => new Date(h.date).getDate() === item.day)
                        .slice(0, 2)
                        .map((h, i) => (
                          <div
                            key={i}
                            className={`text-[10px] truncate px-1.5 py-0.5 rounded ${
                              h.category === "public"
                                ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                                : h.category === "joint"
                                  ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                                  : "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                            }`}
                          >
                            {h.name}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }

  // MINI VIEW MODE (Year View)
  return (
    <>
      <Tooltip
        holiday={tooltip.holiday}
        visible={tooltip.visible}
        x={tooltip.x}
        y={tooltip.y}
      />

      <div className="rounded-xl border-2 border-border bg-card p-3 shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5">
        {/* Month Header */}
        <h3 className="text-center text-xs font-bold mb-2 uppercase tracking-wide text-foreground">
          {MONTHS_ID[month]}
        </h3>

        {/* Day Headers - using CSS classes for dark mode */}
        <div className="grid grid-cols-7 gap-0 mb-1">
          {DAYS.map((day, idx) => (
            <div
              key={day}
              className={`text-center text-[9px] font-extrabold py-1 ${
                idx === 0
                  ? "text-red-500"
                  : idx === 6
                    ? "text-blue-500"
                    : "text-muted-foreground"
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-0">
          {days.map((item, idx) => {
            const colors = item.isCurrentMonth
              ? getHolidayColors(item.day)
              : [];
            const hasHolidays = colors.length > 0;
            const isHoliday = item.isCurrentMonth && dayHasHoliday(item.day);
            const isCurrentDay = item.isCurrentMonth && isToday(item.day);
            const isPast = item.isCurrentMonth && isPastDate(item.day);
            const dayOfWeek = idx % 7;

            const bgColor = getCellBgColor(
              item,
              isCurrentDay,
              isPast,
              isHoliday,
            );
            const textColor = getTextColor(
              item,
              isCurrentDay,
              isPast,
              isHoliday,
              dayOfWeek,
            );

            return (
              <div
                key={idx}
                className={`
                  aspect-square flex flex-col items-center justify-start pt-1 rounded-sm
                  ${bgColor}
                  ${isHoliday ? "cursor-pointer" : "cursor-default"}
                  hover:bg-muted/50 transition-colors duration-150
                `}
                onMouseEnter={(e) => isHoliday && handleMouseEnter(item.day, e)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {/* Day Number */}
                <span
                  className={`text-[11px] leading-none font-bold ${textColor}`}
                >
                  {item.day}
                </span>

                {/* Holiday Dots */}
                {hasHolidays && (
                  <div className="flex gap-0.5 mt-0.5 flex-wrap justify-center">
                    {colors.slice(0, 3).map((color, i) => (
                      <span
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full ${color}`}
                      />
                    ))}
                    {colors.length > 3 && (
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
