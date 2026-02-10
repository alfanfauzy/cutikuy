// Google Calendar Style Year View - Indonesia Holidays with Dark Mode
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

  // Get current date info
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDate = today.getDate();

  // Filter holidays based on category
  const filteredHolidays = useMemo(() => {
    return holidays.filter((h) => {
      if (selectedCategory === "all") return true;
      return h.category === selectedCategory;
    });
  }, [holidays, selectedCategory]);

  // Group holidays by month
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

  // Calculate holidays count per month
  const holidaysPerMonth = useMemo(() => {
    const counts = new Array(12).fill(0);
    filteredHolidays.forEach((h) => {
      const month = new Date(h.date).getMonth();
      counts[month]++;
    });
    return counts;
  }, [filteredHolidays]);

  // Calculate total stats
  const stats = useMemo(() => {
    return {
      total: holidays.length,
      public: holidays.filter((h) => h.category === "public").length,
      joint: holidays.filter((h) => h.category === "joint").length,
    };
  }, [holidays]);

  // Toggle fullscreen - uses the prop from parent
  const handleFullscreenToggle = () => {
    if (toggleCalendarFullscreen) {
      toggleCalendarFullscreen();
    }
  };

  // Filter buttons config
  const filterButtons = [
    {
      id: "all",
      label: "Semua",
      color: "bg-green-500",
      bg: "bg-green-100",
      border: "border-green-500",
      count: stats.total,
    },
    {
      id: "public",
      label: "Libur Nasional",
      color: "bg-red-500",
      bg: "bg-red-100",
      border: "border-red-500",
      count: stats.public,
    },
    {
      id: "joint",
      label: "Cuti Bersama",
      color: "bg-amber-500",
      bg: "bg-amber-100",
      border: "border-amber-500",
      count: stats.joint,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Filter Bar with Tabs */}
      <div
        className={`rounded-xl shadow-sm border p-4 transition-colors duration-500 ${
          darkMode ? "bg-[#abd1c6]" : "bg-white border-gray-200"
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* View Tabs */}
          <div
            className={`flex rounded-lg p-1 transition-colors duration-500 ${
              darkMode ? "bg-[#004643]" : "bg-gray-100"
            }`}
          >
            {[
              { id: "year", icon: LayoutGrid, label: "Tahun" },
              { id: "month", icon: CalendarIcon, label: "Bulan" },
              { id: "list", icon: List, label: "Daftar" },
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setViewMode(id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  viewMode === id
                    ? darkMode
                      ? "bg-[#fffffe] text-[#001e1d] shadow-sm"
                      : "bg-white text-red-600 shadow-sm"
                    : darkMode
                      ? "text-gray-400 hover:text-gray-200"
                      : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {filterButtons.map((btn) => (
              <button
                key={btn.id}
                onClick={() => setSelectedCategory(btn.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedCategory === btn.id
                    ? darkMode
                      ? `${btn.bg} text-gray-800 shadow-sm ${btn.border}`
                      : `${btn.bg} text-gray-500 shadow-sm border ${btn.border}`
                    : darkMode
                      ? `bg-gray-100 text-gray-400`
                      : `bg-white text-gray-700 border border-gray-400`
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${btn.color}`} />
                {btn.label}
                <span
                  className={`text-xs px-1.5 py-0.5 rounded transition-colors duration-300 ${
                    selectedCategory === btn.id
                      ? darkMode
                        ? `${btn.color} text-white`
                        : `${btn.color} text-white`
                      : darkMode
                        ? `${btn.color} text-white`
                        : `${btn.color}  text-white`
                  }`}
                >
                  {btn.count}
                </span>
              </button>
            ))}
          </div>

          {/* Fullscreen Button */}
          <button
            onClick={handleFullscreenToggle}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border ${
              darkMode
                ? "text-[#fffffe] hover:bg-gray-700 border-gray-600 bg-[#004643]"
                : "text-gray-600 hover:bg-gray-100 border-gray-200"
            }`}
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

        {/* Month Selector (for Month View) */}
        {viewMode === "month" && (
          <div
            className={`mt-4 pt-4 border-t transition-colors duration-500 ${
              darkMode ? "border-gray-700" : "border-gray-100"
            }`}
          >
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {MONTHS_ID.map((month, idx) => (
                <button
                  key={month}
                  onClick={() => setSelectedMonth(idx)}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                    selectedMonth === idx
                      ? darkMode
                        ? "bg-red-600 text-white"
                        : "bg-red-600 text-white"
                      : darkMode
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {month}
                  {holidaysPerMonth[idx] > 0 && (
                    <span
                      className={`ml-1 text-xs ${selectedMonth === idx ? "text-red-200" : darkMode ? "text-gray-500" : "text-gray-500"}`}
                    >
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
      <div className="flex flex-wrap justify-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          <span
            className={`transition-colors duration-500 ${darkMode ? "text-[#716040]" : "text-gray-600"}`}
          >
            Libur Nasional
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-amber-500"></span>
          <span
            className={`transition-colors duration-500 ${darkMode ? "text-[#716040]" : "text-gray-600"}`}
          >
            Cuti Bersama
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-blue-300 border border-blue-300"></span>
          <span
            className={`transition-colors duration-500 ${darkMode ? "text-[#716040]" : "text-gray-600"}`}
          >
            Hari Ini
          </span>
        </div>
      </div>

      {/* Views */}
      {viewMode === "year" && (
        /* Year View - 12 Month Grid */
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

      {viewMode === "month" && (
        /* Month View - Single Large Month */
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

      {viewMode === "list" && (
        /* List View with Month Separators */
        <div
          className={`rounded-xl shadow-sm border overflow-hidden transition-colors duration-500 ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          <div
            className={`px-6 py-4 border-b transition-colors duration-500 ${
              darkMode
                ? "bg-gray-900 border-gray-700"
                : "bg-gray-50 border-gray-100"
            }`}
          >
            <h3
              className={`font-semibold transition-colors duration-500 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Daftar Hari Libur 2026
            </h3>
          </div>

          {filteredHolidays.length === 0 ? (
            <div className="p-8 text-center">
              <CalendarIcon
                className={`h-12 w-12 mx-auto mb-3 ${darkMode ? "text-gray-600" : "text-gray-300"}`}
              />
              <p
                className={`transition-colors duration-500 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
              >
                Tidak ada hari libur
              </p>
            </div>
          ) : (
            <div className="py-4">
              {Object.entries(holidaysByMonth).map(
                ([monthIdx, monthHolidays], groupIndex) => (
                  <div key={monthIdx}>
                    {/* Month Separator */}
                    {groupIndex > 0 && (
                      <div
                        className={`my-6 border-t transition-colors duration-500 ${
                          darkMode ? "border-gray-700" : "border-gray-200"
                        }`}
                      />
                    )}

                    {/* Month Header */}
                    <div
                      className={`px-6 mb-4 transition-colors duration-500 ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      <span className="text-xs font-medium uppercase tracking-wider">
                        {MONTHS_ID[parseInt(monthIdx)]} {year}
                      </span>
                      <div
                        className={`mt-1 h-px w-full transition-colors duration-500 ${
                          darkMode ? "bg-gray-700" : "bg-gray-200"
                        }`}
                      />
                    </div>

                    {/* Holidays in this month */}
                    <div className="space-y-3">
                      {monthHolidays.map((holiday) => {
                        const date = new Date(holiday.date);
                        const day = date.getDate();
                        const weekday = date.toLocaleDateString("id-ID", {
                          weekday: "long",
                        });
                        const isPast = date < new Date().setHours(0, 0, 0, 0);

                        const colorClass =
                          holiday.category === "public"
                            ? darkMode
                              ? "bg-red-900/30 text-red-300 border-red-800"
                              : "bg-red-100 text-red-800 border-red-200"
                            : holiday.category === "joint"
                              ? darkMode
                                ? "bg-amber-900/30 text-amber-300 border-amber-800"
                                : "bg-amber-100 text-amber-800 border-amber-200"
                              : darkMode
                                ? "bg-blue-900/300 text-blue-300 border-blue-800"
                                : "bg-blue-100 text-blue-800 border-blue-200";

                        return (
                          <div
                            key={holiday.id}
                            className={`mx-4 p-4 rounded-lg border transition-all duration-300 ${
                              isPast
                                ? darkMode
                                  ? "opacity-40 bg-gray-800/50 border-gray-700"
                                  : "opacity-50 bg-gray-50 border-gray-200"
                                : darkMode
                                  ? "bg-gray-800 border-gray-600 hover:border-gray-500 hover:shadow-md"
                                  : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm"
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              {/* Date Box */}
                              <div
                                className={`flex-shrink-0 w-16 text-center p-2 rounded-lg transition-colors duration-300 ${
                                  isPast
                                    ? darkMode
                                      ? "bg-gray-800"
                                      : "bg-gray-100"
                                    : darkMode
                                      ? "bg-gray-700"
                                      : "bg-gray-50"
                                }`}
                              >
                                <div
                                  className={`text-xs uppercase transition-colors duration-300 ${darkMode ? "text-gray-500" : "text-gray-500"}`}
                                >
                                  {MONTHS_ID[parseInt(monthIdx)].slice(0, 3)}
                                </div>
                                <div
                                  className={`text-xl font-bold transition-colors duration-300 ${darkMode ? "text-gray-300" : "text-gray-900"}`}
                                >
                                  {day}
                                </div>
                                <div
                                  className={`text-xs transition-colors duration-300 ${darkMode ? "text-gray-600" : "text-gray-400"}`}
                                >
                                  {weekday.slice(0, 3)}
                                </div>
                              </div>

                              {/* Holiday Info */}
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4
                                    className={`font-bold text-base transition-colors duration-300 ${
                                      isPast
                                        ? darkMode
                                          ? "text-gray-500"
                                          : "text-gray-500"
                                        : darkMode
                                          ? "text-white"
                                          : "text-gray-900"
                                    }`}
                                  >
                                    {holiday.name}
                                  </h4>
                                  <span
                                    className={`text-xs px-2 py-0.5 rounded-full border ${colorClass}`}
                                  >
                                    {holiday.category === "public"
                                      ? "Libur Nasional"
                                      : holiday.category === "joint"
                                        ? "Cuti Bersama"
                                        : "Libur Sekolah"}
                                  </span>
                                </div>
                                <p
                                  className={`text-sm transition-colors duration-300 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
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
