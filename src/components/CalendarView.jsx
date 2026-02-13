import { useState, useMemo } from "react";
import {
  LayoutGrid,
  Calendar as CalendarIcon,
  List,
  Maximize2,
  Minimize2,
} from "lucide-react";
import CalendarMonth from "./CalendarMonth";

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

export default function CalendarView({
  holidays,
  darkMode,
  calendarOnlyMode = false,
  toggleCalendarFullscreen,
}) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("year");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [year] = useState(2026);

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDate = today.getDate();

  const filteredHolidays = useMemo(() => {
    return holidays.filter((h) => {
      if (selectedCategory === "all") return true;
      return h.category === selectedCategory;
    });
  }, [holidays, selectedCategory]);

  const holidaysByMonth = useMemo(() => {
    const grouped = {};
    filteredHolidays.forEach((holiday) => {
      const month = new Date(holiday.date).getMonth();
      if (!grouped[month]) {
        grouped[month] = [];
      }
      grouped[month].push(holiday);
    });
    return grouped;
  }, [filteredHolidays]);

  const holidaysPerMonth = useMemo(() => {
    const counts = new Array(12).fill(0);
    filteredHolidays.forEach((h) => {
      const month = new Date(h.date).getMonth();
      counts[month]++;
    });
    return counts;
  }, [filteredHolidays]);

  const stats = useMemo(() => {
    return {
      total: holidays.length,
      public: holidays.filter((h) => h.category === "public").length,
      joint: holidays.filter((h) => h.category === "joint").length,
    };
  }, [holidays]);

  const handleFullscreenToggle = () => {
    if (toggleCalendarFullscreen) {
      toggleCalendarFullscreen();
    }
  };

  const filterButtons = [
    {
      id: "all",
      label: "Semua",
      color: "bg-emerald-500",
      bg: "bg-emerald-100 dark:bg-emerald-900/30",
      border: "border-emerald-500",
      text: "text-emerald-700 dark:text-emerald-300",
      count: stats.total,
    },
    {
      id: "public",
      label: "Libur Nasional",
      color: "bg-red-500",
      bg: "bg-red-100 dark:bg-red-900/30",
      border: "border-red-500",
      text: "text-red-700 dark:text-red-300",
      count: stats.public,
    },
    {
      id: "joint",
      label: "Cuti Bersama",
      color: "bg-amber-500",
      bg: "bg-amber-100 dark:bg-amber-900/30",
      border: "border-amber-500",
      text: "text-amber-700 dark:text-amber-300",
      count: stats.joint,
    },
  ];

  const viewButtons = [
    { id: "year", icon: <LayoutGrid className="w-4 h-4" />, label: "Tahun" },
    { id: "month", icon: <CalendarIcon className="w-4 h-4" />, label: "Bulan" },
    { id: "list", icon: <List className="w-4 h-4" />, label: "Daftar" },
  ];

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <div className="rounded-2xl border-2 border-border bg-card p-4 shadow-md transition-colors duration-300">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* View Mode Toggle */}
          <div className="flex rounded-xl p-1 bg-muted border border-border">
            {viewButtons.map((item) => (
              <button
                key={item.id}
                onClick={() => setViewMode(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 font-['Doto'] ${
                  viewMode === item.id
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.icon}
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {filterButtons.map((btn) => (
              <button
                key={btn.id}
                onClick={() => setSelectedCategory(btn.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold transition-all duration-200 font-['Doto'] border ${
                  selectedCategory === btn.id
                    ? `${btn.bg} ${btn.text} ${btn.border}`
                    : "bg-muted text-muted-foreground border-transparent hover:border-border"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${btn.color}`} />
                {btn.label}
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full ${btn.color} text-white`}
                >
                  {btn.count}
                </span>
              </button>
            ))}
          </div>

          {/* Fullscreen Button */}
          <button
            onClick={handleFullscreenToggle}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 font-['Doto'] bg-primary text-primary-foreground hover:opacity-90 hover:shadow-glow"
          >
            {calendarOnlyMode ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">
              {calendarOnlyMode ? "Keluar" : "Layar Penuh"}
            </span>
          </button>
        </div>

        {/* Month Selector (Month View Only) */}
        {viewMode === "month" && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {MONTHS_ID.map((month, idx) => (
                <button
                  key={month}
                  onClick={() => setSelectedMonth(idx)}
                  className={`whitespace-nowrap font-bold px-3 py-1.5 rounded-xl text-sm transition-all duration-200 ${
                    selectedMonth === idx
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {month}
                  {holidaysPerMonth[idx] > 0 && (
                    <span className="ml-1 text-xs opacity-70">
                      ({holidaysPerMonth[idx]})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          <span className="text-muted-foreground font-medium">
            Libur Nasional
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-amber-500"></span>
          <span className="text-muted-foreground font-medium">
            Cuti Bersama
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-blue-500/30 border border-blue-500"></span>
          <span className="text-muted-foreground font-medium">Hari Ini</span>
        </div>
      </div>

      {/* Year View */}
      {viewMode === "year" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {MONTHS_ID.map((monthName, monthIndex) => (
            <CalendarMonth
              key={monthIndex}
              year={year}
              month={monthIndex}
              holidays={filteredHolidays}
              selectedCategory={selectedCategory}
              currentDate={{
                year: currentYear,
                month: currentMonth,
                date: currentDate,
              }}
              viewMode="mini"
              darkMode={darkMode}
            />
          ))}
        </div>
      )}

      {/* Month View */}
      {viewMode === "month" && (
        <div className="max-w-3xl mx-auto">
          <CalendarMonth
            year={year}
            month={selectedMonth}
            holidays={filteredHolidays}
            selectedCategory={selectedCategory}
            currentDate={{
              year: currentYear,
              month: currentMonth,
              date: currentDate,
            }}
            viewMode="full"
            darkMode={darkMode}
          />
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="rounded-2xl border-2 border-border bg-card shadow-lg overflow-hidden">
          {/* List Header */}
          <div className="px-6 py-4 border-b bg-muted/50">
            <h3 className="font-semibold text-foreground">
              Daftar Hari Libur 2026
            </h3>
          </div>

          {filteredHolidays.length === 0 ? (
            <div className="p-8 text-center">
              <CalendarIcon className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
              <p className="text-muted-foreground">Tidak ada hari libur</p>
            </div>
          ) : (
            <div className="py-4">
              {Object.entries(holidaysByMonth).map(
                ([monthIdx, monthHolidays], groupIndex) => (
                  <div key={monthIdx}>
                    {groupIndex > 0 && (
                      <div className="my-6 border-t border-border" />
                    )}

                    {/* Month Divider */}
                    <div className="px-6 mb-4">
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {MONTHS_ID[parseInt(monthIdx)]} {year}
                      </span>
                      <div className="mt-1 h-px w-full bg-border" />
                    </div>

                    {/* Holiday Items */}
                    <div className="space-y-3 px-4">
                      {monthHolidays.map((holiday) => {
                        const date = new Date(holiday.date);
                        const day = date.getDate();
                        const weekday = date.toLocaleDateString("id-ID", {
                          weekday: "long",
                        });
                        const isPast = date < new Date().setHours(0, 0, 0, 0);

                        const badgeColor =
                          holiday.category === "public"
                            ? "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800"
                            : holiday.category === "joint"
                              ? "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800"
                              : "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800";

                        return (
                          <div
                            key={holiday.id}
                            className={`p-4 rounded-xl border transition-all duration-200 hover:shadow-soft ${
                              isPast
                                ? "opacity-50 bg-muted/50 border-border"
                                : "bg-card border-border hover:border-primary/30"
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              {/* Date Box */}
                              <div className="flex-shrink-0 w-16 text-center p-2 rounded-xl bg-muted">
                                <div className="text-xs uppercase text-muted-foreground">
                                  {MONTHS_ID[parseInt(monthIdx)].slice(0, 3)}
                                </div>
                                <div className="text-xl font-bold text-foreground">
                                  {day}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {weekday.slice(0, 3)}
                                </div>
                              </div>

                              {/* Holiday Info */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                  <h4
                                    className={`font-bold text-base ${isPast ? "text-muted-foreground" : "text-foreground"}`}
                                  >
                                    {holiday.name}
                                  </h4>
                                  <span
                                    className={`text-xs px-2 py-0.5 rounded-full border ${badgeColor}`}
                                  >
                                    {holiday.category === "public"
                                      ? "Libur Nasional"
                                      : holiday.category === "joint"
                                        ? "Cuti Bersama"
                                        : "Libur Sekolah"}
                                  </span>
                                </div>
                                <p
                                  className={`text-sm ${isPast ? "text-muted-foreground/70" : "text-muted-foreground"}`}
                                >
                                  {holiday.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ),
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
