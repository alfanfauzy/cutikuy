// Google Calendar Style Month Component with Tooltip and Weekend Colors
import { useMemo, useState } from 'react';

const DAYS = ['MIN', 'SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB'];
const DAYS_FULL = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const MONTHS_ID = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

// Tooltip Component
function Tooltip({ holiday, visible, x, y, darkMode }) {
  if (!visible || !holiday) return null;
  
  const colorClass = holiday.category === 'public' 
    ? 'border-l-4 border-red-500'
    : holiday.category === 'joint'
    ? 'border-l-4 border-amber-500'
    : 'border-l-4 border-blue-500';
  
  const categoryLabel = holiday.category === 'public' 
    ? 'Libur Nasional'
    : holiday.category === 'joint'
    ? 'Cuti Bersama'
    : 'Libur Sekolah';

  // Prevent tooltip from going off-screen
  const adjustedX = Math.min(x + 10, window.innerWidth - 220);
  const adjustedY = y > 300 ? y - 100 : y + 10;

  return (
    <div 
      className={`fixed z-50 rounded-lg shadow-xl border p-3 max-w-xs pointer-events-none ${colorClass} ${
        darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'
      }`}
      style={{ left: adjustedX, top: adjustedY }}
    >
      <div className={`text-xs font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        {holiday.name}
      </div>
      <div className={`text-xs mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        {holiday.description}
      </div>
      <div className="flex items-center gap-1">
        <span className={`w-2 h-2 rounded-full ${
          holiday.category === 'public' ? 'bg-red-500' : 
          holiday.category === 'joint' ? 'bg-amber-500' : 'bg-blue-500'
        }`}></span>
        <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {categoryLabel}
        </span>
      </div>
    </div>
  );
}

export default function CalendarMonth({ 
  year, 
  month, 
  holidays, 
  selectedCategory,
  currentDate,
  viewMode = 'mini',
  darkMode = false
}) {
  const [tooltip, setTooltip] = useState({ visible: false, holiday: null, x: 0, y: 0 });

  // Get holidays for this month based on filter
  const monthHolidays = useMemo(() => {
    return holidays.filter(h => {
      const date = new Date(h.date);
      const isRightMonth = date.getMonth() === month && date.getFullYear() === year;
      if (!isRightMonth) return false;
      
      if (selectedCategory === 'all') return true;
      return h.category === selectedCategory;
    });
  }, [holidays, month, year, selectedCategory]);

  // Get holiday for a specific day
  const getHolidayForDay = (day) => {
    return monthHolidays.find(h => {
      const date = new Date(h.date);
      return date.getDate() === day;
    });
  };

  // Get holiday colors for a specific day (for dots)
  const getHolidayColors = (day) => {
    const dayHolidays = monthHolidays.filter(h => {
      const date = new Date(h.date);
      return date.getDate() === day;
    });
    
    return dayHolidays.map(h => {
      switch (h.category) {
        case 'public':
          return 'bg-red-500';
        case 'joint':
          return 'bg-amber-500';
        case 'school':
          return 'bg-blue-500';
        default:
          return 'bg-gray-400';
      }
    });
  };

  // Check if day has holiday
  const hasHoliday = (day) => {
    return monthHolidays.some(h => {
      const date = new Date(h.date);
      return date.getDate() === day;
    });
  };

  // Get holiday info for styling
  const getHolidayInfo = (day) => {
    return monthHolidays.find(h => {
      const date = new Date(h.date);
      return date.getDate() === day;
    });
  };

  // Check if date is today
  const isToday = (day) => {
    if (!currentDate) return false;
    return year === currentDate.year && 
           month === currentDate.month && 
           day === currentDate.date;
  };

  // Check if date is in the past
  const isPastDate = (day) => {
    const checkDate = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return checkDate < today;
  };

  // Handle mouse enter on holiday date
  const handleMouseEnter = (day, e) => {
    const holiday = getHolidayForDay(day);
    if (holiday) {
      setTooltip({
        visible: true,
        holiday,
        x: e.clientX,
        y: e.clientY
      });
    }
  };

  // Handle mouse move for tooltip positioning
  const handleMouseMove = (e) => {
    if (tooltip.visible) {
      setTooltip(prev => ({
        ...prev,
        x: e.clientX,
        y: e.clientY
      }));
    }
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    setTooltip({ visible: false, holiday: null, x: 0, y: 0 });
  };

  // Calendar grid calculations
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  // Generate calendar days (6 rows x 7 columns = 42 cells)
  const generateDays = () => {
    const days = [];
    
    // Previous month padding
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push({ 
        day: daysInPrevMonth - i, 
        isCurrentMonth: false,
        isPadding: true 
      });
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ 
        day: i, 
        isCurrentMonth: true,
        isPadding: false
      });
    }
    
    // Next month padding to fill 6 rows (42 cells)
    const remainingCells = 42 - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      days.push({ 
        day: i, 
        isCurrentMonth: false,
        isPadding: true 
      });
    }
    
    return days;
  };

  const days = generateDays();
  const dayHasHoliday = (day) => hasHoliday(day);

  // Get cell background color based on state
  const getCellBgColor = (item, isCurrentDay, isPast, isHoliday, dayOfWeek) => {
    const isSunday = dayOfWeek === 0;
    const isSaturday = dayOfWeek === 6;
    
    // Current day - blue bg
    if (isCurrentDay) {
      return darkMode ? 'bg-blue-900/50' : 'bg-blue-100';
    }
    
    // Holiday - colored bg based on category
    if (isHoliday && !isPast) {
      const holidayInfo = getHolidayInfo(item.day);
      if (holidayInfo?.category === 'public') {
        return darkMode ? 'bg-red-900/30' : 'bg-red-50';
      } else if (holidayInfo?.category === 'joint') {
        return darkMode ? 'bg-amber-900/30' : 'bg-amber-50';
      }
    }
    
    // Past dates - grayed out
    if (isPast) {
      return darkMode ? 'bg-gray-800/30' : 'bg-gray-100/50';
    }
    
    // Default background - white for full view (not gray)
    return darkMode ? 'bg-gray-800' : 'bg-white';
  };

  // Get text color for day number
  const getTextColor = (item, isCurrentDay, isPast, isHoliday, dayOfWeek) => {
    const isSunday = dayOfWeek === 0;
    const isSaturday = dayOfWeek === 6;
    
    if (!item.isCurrentMonth) {
      return darkMode ? 'text-gray-600' : 'text-gray-300';
    }
    
    // Current day
    if (isCurrentDay) {
      return darkMode ? 'text-blue-400 font-bold' : 'text-blue-600 font-bold';
    }
    
    // Past dates - all muted
    if (isPast) {
      return darkMode ? 'text-gray-600' : 'text-gray-400';
    }
    
    // Weekend colors for current/future dates
    if (isSunday) {
      return darkMode ? 'text-red-400' : 'text-red-500';
    }
    if (isSaturday) {
      return darkMode ? 'text-blue-400' : 'text-blue-500';
    }
    
    // Holiday text
    if (isHoliday) {
      const holidayInfo = getHolidayInfo(item.day);
      if (holidayInfo?.category === 'public') {
        return darkMode ? 'text-red-400 font-medium' : 'text-red-600 font-medium';
      } else if (holidayInfo?.category === 'joint') {
        return darkMode ? 'text-amber-400 font-medium' : 'text-amber-600 font-medium';
      }
    }
    
    return darkMode ? 'text-gray-300' : 'text-gray-700';
  };

  // FULL VIEW MODE (for Month view)
  if (viewMode === 'full') {
    return (
      <>
        <Tooltip holiday={tooltip.holiday} visible={tooltip.visible} x={tooltip.x} y={tooltip.y} darkMode={darkMode} />
        
        <div className={`rounded-xl border shadow-sm p-6 transition-colors duration-300 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          {/* Month Header */}
          <div className="text-center mb-6">
            <h2 className={`text-2xl font-bold transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {MONTHS_ID[month]} {year}
            </h2>
            <p className={`text-sm mt-1 transition-colors duration-300 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {monthHolidays.length} hari libur
            </p>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-0 mb-2">
            {DAYS_FULL.map((day, idx) => (
              <div 
                key={day} 
                className={`text-center text-sm font-semibold py-2 transition-colors duration-300 ${
                  idx === 0 
                    ? (darkMode ? 'text-red-400' : 'text-red-500')
                    : idx === 6 
                      ? (darkMode ? 'text-blue-400' : 'text-blue-500')
                      : (darkMode ? 'text-gray-400' : 'text-gray-700')
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid - White background like year view */}
          <div className={`grid grid-cols-7 border rounded-lg overflow-hidden transition-colors duration-300 ${
            darkMode ? 'border-gray-600' : 'border-gray-200'
          }`}>
            {days.map((item, idx) => {
              const colors = item.isCurrentMonth ? getHolidayColors(item.day) : [];
              const hasHolidays = colors.length > 0;
              const isHoliday = item.isCurrentMonth && dayHasHoliday(item.day);
              const isCurrentDay = item.isCurrentMonth && isToday(item.day);
              const isPast = item.isCurrentMonth && isPastDate(item.day);
              const dayOfWeek = idx % 7;
              
              const bgColor = getCellBgColor(item, isCurrentDay, isPast, isHoliday, dayOfWeek);
              const textColor = getTextColor(item, isCurrentDay, isPast, isHoliday, dayOfWeek);
              
              return (
                <div 
                  key={idx}
                  className={`
                    min-h-[100px] p-2 relative border-b border-r transition-colors duration-200
                    ${bgColor}
                    ${item.isPadding ? (darkMode ? 'bg-gray-800/50' : 'bg-gray-50') : ''}
                    ${isHoliday ? 'cursor-pointer' : 'cursor-default'}
                    ${darkMode ? 'border-gray-700' : 'border-gray-100'}
                  `}
                  onMouseEnter={(e) => isHoliday && handleMouseEnter(item.day, e)}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Day Number */}
                  <span className={`text-sm ${textColor}`}>
                    {item.day}
                  </span>
                  
                  {/* Holiday Dots */}
                  {hasHolidays && (
                    <div className="flex gap-1 mt-1 flex-wrap">
                      {colors.slice(0, 4).map((color, i) => (
                        <span key={i} className={`w-2 h-2 rounded-full ${color}`} />
                      ))}
                    </div>
                  )}
                  
                  {/* Holiday Names */}
                  {isHoliday && (
                    <div className="mt-1 space-y-0.5">
                      {monthHolidays
                        .filter(h => new Date(h.date).getDate() === item.day)
                        .slice(0, 2)
                        .map((h, i) => (
                          <div 
                            key={i}
                            className={`text-[10px] truncate px-1.5 py-0.5 rounded ${
                              h.category === 'public' 
                                ? (darkMode ? 'bg-red-900/50 text-red-300' : 'bg-red-100 text-red-700')
                                : h.category === 'joint'
                                  ? (darkMode ? 'bg-amber-900/50 text-amber-300' : 'bg-amber-100 text-amber-700')
                                  : (darkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700')
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

  // MINI VIEW MODE (for Year view)
  return (
    <>
      <Tooltip holiday={tooltip.holiday} visible={tooltip.visible} x={tooltip.x} y={tooltip.y} darkMode={darkMode} />

      <div className={`rounded-lg border p-3 transition-all duration-200 hover:shadow-md ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        {/* Month Header */}
        <h3 className={`text-center text-xs font-semibold mb-2 uppercase tracking-wide transition-colors duration-300 ${
          darkMode ? 'text-gray-400' : 'text-gray-700'
        }`}>
          {MONTHS_ID[month]}
        </h3>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-0 mb-1">
          {DAYS.map((day, idx) => (
            <div 
              key={day} 
              className={`text-center text-[9px] font-medium py-1 transition-colors duration-300 ${
                idx === 0 
                  ? (darkMode ? 'text-red-400' : 'text-red-500')
                  : idx === 6 
                    ? (darkMode ? 'text-blue-400' : 'text-blue-500')
                    : (darkMode ? 'text-gray-500' : 'text-gray-500')
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-0">
          {days.map((item, idx) => {
            const colors = item.isCurrentMonth ? getHolidayColors(item.day) : [];
            const hasHolidays = colors.length > 0;
            const isHoliday = item.isCurrentMonth && dayHasHoliday(item.day);
            const isCurrentDay = item.isCurrentMonth && isToday(item.day);
            const isPast = item.isCurrentMonth && isPastDate(item.day);
            const dayOfWeek = idx % 7;
            
            const bgColor = getCellBgColor(item, isCurrentDay, isPast, isHoliday, dayOfWeek);
            const textColor = getTextColor(item, isCurrentDay, isPast, isHoliday, dayOfWeek);
            
            return (
              <div 
                key={idx}
                className={`
                  aspect-square flex flex-col items-center justify-start pt-1 rounded-sm transition-colors duration-200
                  ${bgColor}
                  ${isHoliday ? 'cursor-pointer' : 'cursor-default'}
                `}
                onMouseEnter={(e) => isHoliday && handleMouseEnter(item.day, e)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {/* Day Number */}
                <span className={`text-[11px] leading-none ${textColor}`}>
                  {item.day}
                </span>
                
                {/* Holiday Dots */}
                {hasHolidays && (
                  <div className="flex gap-0.5 mt-0.5 flex-wrap justify-center">
                    {colors.slice(0, 3).map((color, i) => (
                      <span key={i} className={`w-1.5 h-1.5 rounded-full ${color}`} />
                    ))}
                    {colors.length > 3 && (
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
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
