// Calendar Month Component
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

const CATEGORY_META = {
  public: {
    label: "Libur Nasional",
    dot: "bg-holiday-public",
    bar: "border-holiday-public",
    text: "text-holiday-public",
    chip: "bg-holiday-public/15 text-holiday-public",
    wash: "bg-holiday-public/5 dark:bg-holiday-public/10",
  },
  joint: {
    label: "Cuti Bersama",
    dot: "bg-holiday-joint",
    bar: "border-holiday-joint",
    text: "text-holiday-joint",
    chip: "bg-holiday-joint/15 text-holiday-joint",
    wash: "bg-holiday-joint/5 dark:bg-holiday-joint/10",
  },
  school: {
    label: "Libur Sekolah",
    dot: "bg-holiday-school",
    bar: "border-holiday-school",
    text: "text-holiday-school",
    chip: "bg-holiday-school/15 text-holiday-school",
    wash: "bg-holiday-school/5 dark:bg-holiday-school/10",
  },
};

// Tooltip Component with Portal for correct positioning
function Tooltip({ holiday, visible, x, y }) {
  if (!visible || !holiday) return null;

  const meta = CATEGORY_META[holiday.category] || CATEGORY_META.school;

  const tooltipWidth = 280;
  const tooltipHeight = 100;
  const padding = 16;

  let left = x + 12;
  let top = y + 12;

  if (left + tooltipWidth > window.innerWidth - padding) {
    left = x - tooltipWidth - 12;
  }

  if (top + tooltipHeight > window.innerHeight - padding) {
    top = y - tooltipHeight - 12;
  }

  if (left < padding) {
    left = padding;
  }

  if (top < padding) {
    top = padding;
  }

  const tooltipContent = (
    <div
      role="tooltip"
      className={`fixed z-[9999] rounded-xl border border-border bg-popover text-popover-foreground p-3 shadow-xl max-w-[280px] border-l-4 ${meta.bar} pointer-events-none animate-fade-scale`}
      style={{
        left: `${left}px`,
        top: `${top}px`,
      }}
    >
      <div className="text-sm font-semibold mb-1">{holiday.name}</div>
      <div className="text-xs text-muted-foreground mb-2 line-clamp-2">
        {holiday.description}
      </div>
      <div className="flex items-center gap-1.5">
        <span
          className={`w-2 h-2 rounded-full ${meta.dot}`}
          aria-hidden="true"
        />
        <span className="text-xs font-medium">{meta.label}</span>
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

  const holidayForDay = (day) => {
    return monthHolidays.find((h) => {
      const date = new Date(h.date);
      return date.getDate() === day;
    });
  };

  const holidayColorsForDay = (day) => {
    return monthHolidays
      .filter((h) => {
        const date = new Date(h.date);
        return date.getDate() === day;
      })
      .map((h) => {
        const meta = CATEGORY_META[h.category];
        return meta ? meta.dot : "bg-gray-400";
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

  const showTooltip = (day, x, y) => {
    const holiday = holidayForDay(day);
    if (holiday) {
      setTooltip({ visible: true, holiday, x, y });
    }
  };

  const hideTooltip = () => {
    setTooltip({ visible: false, holiday: null, x: 0, y: 0 });
  };

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const generateDays = () => {
    const days = [];
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        isCurrentMonth: false,
        isPadding: true,
      });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, isCurrentMonth: true, isPadding: false });
    }
    const remainingCells = 42 - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      days.push({ day: i, isCurrentMonth: false, isPadding: true });
    }
    return days;
  };

  const days = generateDays();

  const getCellBgColor = (item, isCurrentDay, isPast, isHoliday) => {
    if (isCurrentDay) return "bg-primary/10 dark:bg-primary/20";
    if (isPast) return "bg-muted/30";
    if (isHoliday) {
      const holidayInfo = holidayForDay(item.day);
      if (holidayInfo?.category === "public")
        return CATEGORY_META.public.wash;
      if (holidayInfo?.category === "joint")
        return CATEGORY_META.joint.wash;
      return "bg-transparent";
    }
    return "bg-transparent";
  };

  const getTextColor = (item, isCurrentDay, isPast, isHoliday, dayOfWeek) => {
    if (!item.isCurrentMonth) return "text-muted-foreground/40";
    if (isCurrentDay) return "text-primary font-bold";
    if (isPast) return "text-muted-foreground/60";
    if (dayOfWeek === 0) return "text-weekend-sun";
    if (dayOfWeek === 6) return "text-weekend-sat";
    if (isHoliday) {
      const holidayInfo = holidayForDay(item.day);
      if (holidayInfo?.category === "public")
        return `${CATEGORY_META.public.text} font-medium`;
      if (holidayInfo?.category === "joint")
        return `${CATEGORY_META.joint.text} font-medium`;
    }
    return "text-foreground";
  };

  const dayCellHandlers = (item, isHoliday) =>
    isHoliday
      ? {
          tabIndex: 0,
          role: "button",
          "aria-label": holidayForDay(item.day)?.name,
          onMouseEnter: (e) => showTooltip(item.day, e.clientX, e.clientY),
          onMouseMove: (e) =>
            tooltip.visible &&
            setTooltip((prev) => ({ ...prev, x: e.clientX, y: e.clientY })),
          onMouseLeave: hideTooltip,
          onFocus: (e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            showTooltip(item.day, rect.left + rect.width / 2, rect.top);
          },
          onBlur: hideTooltip,
          onClick: (e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height;
            if (
              tooltip.visible &&
              tooltip.holiday?.date === holidayForDay(item.day)?.date
            ) {
              hideTooltip();
            } else {
              showTooltip(item.day, x, y);
            }
          },
        }
      : {};

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

        <div className="rounded-2xl border border-border bg-card shadow-sm p-4 sm:p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              {MONTHS_ID[month]} {year}
            </h2>
            <p className="text-sm mt-1 text-muted-foreground">
              {monthHolidays.length} hari libur
            </p>
          </div>

          <div className="grid grid-cols-7 gap-0 mb-2">
            {DAYS_FULL.map((day, idx) => (
              <div
                key={day}
                className={`text-center text-sm font-semibold py-2 ${
                  idx === 0
                    ? "text-weekend-sun"
                    : idx === 6
                      ? "text-weekend-sat"
                      : "text-foreground"
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 border border-border rounded-xl overflow-hidden">
            {days.map((item, idx) => {
              const colors = item.isCurrentMonth
                ? holidayColorsForDay(item.day)
                : [];
              const hasHolidays = colors.length > 0;
              const isHoliday = item.isCurrentMonth && hasHolidays;
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
                    min-h-[100px] p-1.5 sm:p-2 relative border-b border-r border-border
                    ${bgColor}
                    ${item.isPadding ? "bg-muted/20" : ""}
                    ${isHoliday ? "cursor-pointer" : "cursor-default"}
                    hover:bg-muted/50 transition-colors duration-150
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset
                  `}
                  {...dayCellHandlers(item, isHoliday)}
                >
                  <span className={`text-sm ${textColor}`}>{item.day}</span>

                  {hasHolidays && (
                    <div className="flex gap-1 mt-1 flex-wrap">
                      {colors.slice(0, 4).map((color, i) => (
                        <span
                          key={i}
                          className={`w-2 h-2 rounded-full ${color}`}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  )}

                  {isHoliday && (
                    <div className="mt-1 space-y-0.5">
                      {monthHolidays
                        .filter((h) => new Date(h.date).getDate() === item.day)
                        .slice(0, 2)
                        .map((h, i) => (
                          <div
                            key={i}
                            className={`text-[10px] truncate px-1.5 py-0.5 rounded ${
                              CATEGORY_META[h.category]?.chip ||
                              CATEGORY_META.school.chip
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

      <div className="rounded-xl border border-border bg-card p-3 transition-colors duration-200 hover:bg-muted/40">
        <h3 className="text-center text-xs font-bold mb-2 text-foreground">
          {MONTHS_ID[month]}
        </h3>

        <div className="grid grid-cols-7 gap-0 mb-1">
          {DAYS.map((day, idx) => (
            <div
              key={day}
              className={`text-center text-[9px] font-semibold py-1 ${
                idx === 0
                  ? "text-weekend-sun"
                  : idx === 6
                    ? "text-weekend-sat"
                    : "text-muted-foreground"
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-0">
          {days.map((item, idx) => {
            const colors = item.isCurrentMonth
              ? holidayColorsForDay(item.day)
              : [];
            const hasHolidays = colors.length > 0;
            const isHoliday = item.isCurrentMonth && hasHolidays;
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
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset
                `}
                {...dayCellHandlers(item, isHoliday)}
              >
                <span
                  className={`text-[11px] leading-none font-semibold ${textColor}`}
                >
                  {item.day}
                </span>

                {hasHolidays && (
                  <div className="flex gap-0.5 mt-0.5 flex-wrap justify-center">
                    {colors.slice(0, 3).map((color, i) => (
                      <span
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full ${color}`}
                        aria-hidden="true"
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