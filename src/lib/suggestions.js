// Leave suggestion engine: finds workdays that, if taken as annual leave (cuti
// tahunan), bridge a holiday to the nearest weekend and extend the break.
//
// Feed it the FULL combined dataset (ALL_HOLIDAYS) so the December rule can
// see past the year boundary into January of the following year.

const pad = (n) => String(n).padStart(2, "0");

const toISO = (d) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

const isWeekend = (d) => d.getDay() === 0 || d.getDay() === 6;

const isSameDate = (a, b) => toISO(a) === toISO(b);

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

  const suggestNames = (date, nameList) => {
    if (isWeekend(date)) return;
    const key = toISO(date);
    if (holidaySet.has(key)) return;

    const existing = suggestions.get(key) || { date: key, names: [] };
    nameList.forEach((name) => {
      if (!existing.names.includes(name)) existing.names.push(name);
    });
    suggestions.set(key, existing);
  };

  const holidayNamesOn = (date) =>
    holidays
      .filter((h) => isSameDate(new Date(h.date), date))
      .map((h) => h.name);

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

  // December -> New Year bridge: when the year ends on a free run (Christmas
  // cluster Dec 24-26 plus a free January 1st), suggest every remaining
  // workday until Dec 31 so the whole break stretches across New Year.
  const yearsPresent = new Set(
    holidays.map((h) => new Date(h.date).getFullYear()),
  );

  for (const y of yearsPresent) {
    const clusterNames = [];
    for (let dt = new Date(y, 11, 24); dt.getMonth() === 11; dt.setDate(dt.getDate() + 1)) {
      const names = holidayNamesOn(dt);
      if (names.length > 0) clusterNames.push(...names);
    }
    if (clusterNames.length === 0) continue;

    const jan1 = new Date(y + 1, 0, 1);
    const jan1Free =
      isWeekend(jan1) || holidaySet.has(toISO(jan1));
    if (!jan1Free) continue;

    const names = [...new Set(clusterNames)];
    if (!isWeekend(jan1)) {
      holidayNamesOn(jan1).forEach((n) => {
        if (!names.includes(n)) names.push(n);
      });
    }

    for (let dt = new Date(y, 11, 27); dt.getFullYear() === y; dt.setDate(dt.getDate() + 1)) {
      suggestNames(dt, names);
    }
  }

  return [...suggestions.values()];
}