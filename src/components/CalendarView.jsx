import { useState, useMemo } from "react";
import {
  LayoutGrid,
  Calendar as CalendarIcon,
  List,
  Maximize2,
  Minimize2,
} from "lucide-react";
import CalendarMonth from "./CalendarMonth";
import { computeLeaveSuggestions } from "../lib/suggestions";

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

const VIEW_MODES = [
  { id: "year", icon: <LayoutGrid className="w-4 h-4" />, label: "Tahun" },
  { id: "month", icon: <CalendarIcon className="w-4 h-4" />, label: "Bulan" },
  { id: "list", icon: <List className="w-4 h-4" />, label: "Daftar" },
];

export default function CalendarView({
  holidaysByYear,
  allHolidays,
  selectedYear,
  calendarOnlyMode = false,
  toggleCalendarFullscreen,
}) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("year");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [showSuggestions, setShowSuggestions] = useState(false);

  const years = Object.keys(holidaysByYear).map(Number).sort();
  const holidays = holidaysByYear[selectedYear] ?? holidaysByYear[years[0]];

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

  const canSuggest = selectedCategory === "all";

  const suggestions = useMemo(() => {
    if (!canSuggest || !showSuggestions) return [];
    return computeLeaveSuggestions(allHolidays).filter((s) =>
      s.date.startsWith(String(selectedYear)),
    );
  }, [canSuggest, showSuggestions, allHolidays, selectedYear]);

  const filterOptions = [
    {
      id: "all",
      label: "Semua",
      activeClass: "bg-foreground text-background border-foreground",
      dotClass: "bg-foreground",
      count: stats.total,
    },
    {
      id: "public",
      label: "Libur Nasional",
      activeClass:
        "bg-red-600 text-white border-red-600 dark:bg-red-400 dark:text-red-950 dark:border-red-400",
      dotClass: "bg-holiday-public",
      count: stats.public,
    },
    {
      id: "joint",
      label: "Cuti Bersama",
      activeClass:
        "bg-amber-500 text-amber-950 border-amber-500 dark:bg-amber-400 dark:text-amber-950 dark:border-amber-400",
      dotClass: "bg-holiday-joint",
      count: stats.joint,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <div className="rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* View Mode Toggle */}
          <div
            className="flex rounded-full bg-muted p-1 w-fit"
            role="tablist"
            aria-label="Mode tampilan"
          >
            {VIEW_MODES.map((item) => {
              const isSelected = viewMode === item.id;
              return (
                <button
                  key={item.id}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setViewMode(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                    isSelected
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Category Filters */}
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter kategori hari libur"
          >
            {filterOptions.map((opt) => {
              const isSelected = selectedCategory === opt.id;
              return (
                <button
                  key={opt.id}
                  aria-pressed={isSelected}
                  onClick={() => setSelectedCategory(opt.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-colors duration-200 ${
                    isSelected
                      ? opt.activeClass
                      : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-muted-foreground/40"
                  }`}
                >
                  {!isSelected && (
                    <span
                      className={`w-2 h-2 rounded-full ${opt.dotClass}`}
                      aria-hidden="true"
                    />
                  )}
                  {opt.label}
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full ${
                      isSelected
                        ? "bg-white/20"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {opt.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Fullscreen Button */}
          <button
            onClick={toggleCalendarFullscreen}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 border border-border bg-card text-muted-foreground hover:text-foreground hover:border-muted-foreground/40"
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
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                    selectedMonth === idx
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                  }`}
                >
                  {month}
                  {holidaysPerMonth[idx] > 0 && (
                    <span
                      className={`ml-1 text-xs ${
                        selectedMonth === idx ? "opacity-80" : "opacity-60"
                      }`}
                    >
                      ({holidaysPerMonth[idx]})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Leave Suggestion Toggle */}
        <div className="mt-4 pt-4 border-t border-border flex flex-wrap items-center justify-between gap-3">
          <button
            role="switch"
            aria-checked={canSuggest && showSuggestions}
            onClick={() => {
              if (!canSuggest) {
                setSelectedCategory("all");
                setShowSuggestions(true);
              } else {
                setShowSuggestions((v) => !v);
              }
            }}
            className="flex items-center gap-2.5 text-sm font-semibold text-left cursor-pointer transition-colors duration-200 text-foreground"
          >
            <span
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 ${
                canSuggest && showSuggestions
                  ? "bg-suggestion"
                  : "bg-muted border border-border"
              }`}
              aria-hidden="true"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
                  canSuggest && showSuggestions
                    ? "translate-x-4"
                    : "translate-x-0.5"
                }`}
              />
            </span>
            Saran Cuti
          </button>
        </div>

        {!canSuggest && (
          <p className="mt-2 text-xs text-muted-foreground">
            Tekan toggle untuk memilih filter "Semua" dan melihat saran ambil
            cuti.
          </p>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
        <div className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full bg-holiday-public"
            aria-hidden="true"
          />
          <span className="text-foreground">Libur Nasional</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full bg-holiday-joint"
            aria-hidden="true"
          />
          <span className="text-foreground">Cuti Bersama</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-sm border-2 border-primary"
            aria-hidden="true"
          />
          <span className="text-foreground">Hari Ini</span>
        </div>
        {suggestions.length > 0 && (
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full bg-suggestion"
              aria-hidden="true"
            />
            <span className="text-foreground">Cuti</span>
          </div>
        )}
      </div>

      {/* Year View */}
      {viewMode === "year" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {MONTHS_ID.map((_, monthIndex) => (
            <CalendarMonth
              key={monthIndex}
              year={selectedYear}
              month={monthIndex}
              holidays={filteredHolidays}
              selectedCategory={selectedCategory}
              suggestions={suggestions}
              currentDate={{
                year: currentYear,
                month: currentMonth,
                date: currentDate,
              }}
              viewMode="mini"
            />
          ))}
        </div>
      )}

      {/* Month View */}
      {viewMode === "month" && (
        <div className="max-w-3xl mx-auto">
          <CalendarMonth
            year={selectedYear}
            month={selectedMonth}
            holidays={filteredHolidays}
            selectedCategory={selectedCategory}
            suggestions={suggestions}
            currentDate={{
              year: currentYear,
              month: currentMonth,
              date: currentDate,
            }}
            viewMode="full"
          />
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="px-6 py-4 border-b bg-muted/50">
            <h3 className="font-semibold text-foreground">
              Daftar Hari Libur {selectedYear}
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

                    <div className="px-6 mb-4">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {MONTHS_ID[parseInt(monthIdx)]} {selectedYear}
                      </h4>
                      <div className="mt-1 h-px w-full bg-border" />
                    </div>

                    <div className="space-y-3 px-4">
                      {monthHolidays.map((holiday) => {
                        const date = new Date(holiday.date);
                        const day = date.getDate();
                        const weekday = date.toLocaleDateString("id-ID", {
                          weekday: "long",
                        });
                        const isPast = date < new Date().setHours(0, 0, 0, 0);

                        const badgeClass =
                          holiday.category === "public"
                            ? "bg-holiday-public/15 text-holiday-public border-holiday-public/50"
                            : "bg-holiday-joint/15 text-holiday-joint border-holiday-joint/50";

                        const categoryLabel =
                          holiday.category === "public"
                            ? "Libur Nasional"
                            : "Cuti Bersama";

                        return (
                          <div
                            key={holiday.id}
                            className={`p-4 rounded-xl border transition-colors duration-200 ${
                              isPast
                                ? "opacity-50 bg-muted/50 border-border"
                                : "bg-card border-border"
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0 w-16 text-center p-2 rounded-lg bg-muted">
                                <div className="text-xs text-muted-foreground">
                                  {MONTHS_ID[parseInt(monthIdx)].slice(0, 3)}
                                </div>
                                <div className="text-xl font-bold text-foreground">
                                  {day}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {weekday.slice(0, 3)}
                                </div>
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                  <h5
                                    className={`font-semibold text-base ${isPast ? "text-muted-foreground" : "text-foreground"}`}
                                  >
                                    {holiday.name}
                                  </h5>
                                  <span
                                    className={`text-xs px-2 py-0.5 rounded-full border ${badgeClass}`}
                                  >
                                    {categoryLabel}
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
