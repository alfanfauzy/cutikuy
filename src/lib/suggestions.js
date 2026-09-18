// Leave suggestion engine: finds workdays that, if taken as annual leave (cuti
// tahunan), bridge a holiday to the nearest weekend and extend the break.

const pad = (n) => String(n).padStart(2, "0");

const toISO = (d) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

const isWeekend = (d) => d.getDay() === 0 || d.getDay() === 6;

// Rules by weekday of the holiday:
// - Monday    -> take previous Friday  (Fri + Sat + Sun + Mon)
// - Tuesday   -> take Monday           (Sat + Sun + Mon + Tue)
// - Wednesday -> take Mon+Tue or Thu+Fri (5-day break either side)
// - Thursday  -> take Friday           (Thu + Fri + Sat + Sun)
// - Friday/Sat/Sun -> already a long weekend, no suggestion
export function computeLeaveSuggestions(holidays) {
  const holidaySet = new Set(holidays.map((h) => toISO(new Date(h.date))));
  const suggestions = new Map();

  const suggest = (date, name) => {
    if (isWeekend(date)) return;
    const key = toISO(date);
    if (holidaySet.has(key)) return;

    const existing = suggestions.get(key) || { date: key, names: [] };
    if (!existing.names.includes(name)) existing.names.push(name);
    suggestions.set(key, existing);
  };

  const sorted = [...holidays].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );

  for (const h of sorted) {
    const d = new Date(h.date);
    if (isWeekend(d)) continue;

    const shift = new Date(d);
    switch (d.getDay()) {
      case 1:
        shift.setDate(d.getDate() - 3);
        suggest(shift, h.name);
        break;
      case 2:
        shift.setDate(d.getDate() - 1);
        suggest(shift, h.name);
        break;
      case 3:
        shift.setDate(d.getDate() - 2);
        suggest(shift, h.name);
        shift.setDate(d.getDate() - 1);
        suggest(shift, h.name);
        shift.setDate(d.getDate() + 1);
        suggest(shift, h.name);
        shift.setDate(d.getDate() + 2);
        suggest(shift, h.name);
        break;
      case 4:
        shift.setDate(d.getDate() + 1);
        suggest(shift, h.name);
        break;
      default:
        break;
    }
  }

  return [...suggestions.values()];
}