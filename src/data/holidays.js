// Indonesia Public Holidays 2026
// Source: Based on official Indonesian government holiday calendar (SKB 3 Menteri)

export const holidays = [
  {
    id: 1,
    date: "2026-01-01",
    name: "Tahun Baru Masehi",
    category: "public",
    states: ["Nasional"],
    description: "First day of the Gregorian calendar year"
  },
  {
    id: 2,
    date: "2026-01-16",
    name: "Isra Mikraj Nabi Muhammad SAW",
    category: "public",
    states: ["Nasional"],
    description: "The night journey and ascension of Prophet Muhammad"
  },
  {
    id: 3,
    date: "2026-02-16",
    name: "Cuti Bersama Tahun Baru Imlek",
    category: "joint",
    states: ["Nasional"],
    description: "Collective leave day for Chinese New Year"
  },
  {
    id: 4,
    date: "2026-02-17",
    name: "Tahun Baru Imlek 2577 Kongzili",
    category: "public",
    states: ["Nasional"],
    description: "Chinese New Year - Year of the Horse"
  },
  {
    id: 5,
    date: "2026-03-18",
    name: "Cuti Bersama Hari Raya Nyepi",
    category: "joint",
    states: ["Nasional"],
    description: "Collective leave day for Balinese Day of Silence"
  },
  {
    id: 6,
    date: "2026-03-19",
    name: "Hari Raya Nyepi",
    category: "public",
    states: ["Nasional"],
    description: "Balinese Hindu New Year - Day of silence and meditation"
  },
  {
    id: 7,
    date: "2026-03-20",
    name: "Cuti Bersama Idul Fitri",
    category: "joint",
    states: ["Nasional"],
    description: "Collective leave day for Eid al-Fitr"
  },
  {
    id: 8,
    date: "2026-03-21",
    name: "Hari Raya Idul Fitri 1447H",
    category: "public",
    states: ["Nasional"],
    description: "End of Ramadan, Festival of Breaking the Fast"
  },
  {
    id: 9,
    date: "2026-03-22",
    name: "Hari Raya Idul Fitri 1447H",
    category: "public",
    states: ["Nasional"],
    description: "Second day of Eid al-Fitr"
  },
  {
    id: 10,
    date: "2026-03-23",
    name: "Cuti Bersama Idul Fitri",
    category: "joint",
    states: ["Nasional"],
    description: "Collective leave day after Eid al-Fitr"
  },
  {
    id: 11,
    date: "2026-03-24",
    name: "Cuti Bersama Idul Fitri",
    category: "joint",
    states: ["Nasional"],
    description: "Collective leave day after Eid al-Fitr"
  },
  {
    id: 12,
    date: "2026-04-03",
    name: "Wafat Yesus Kristus (Jumat Agung)",
    category: "public",
    states: ["Nasional"],
    description: "Christian holiday commemorating the crucifixion of Jesus"
  },
  {
    id: 13,
    date: "2026-04-05",
    name: "Kebangkitan Yesus Kristus",
    category: "public",
    states: ["Nasional"],
    description: "Christian celebration of Jesus' resurrection"
  },
  {
    id: 14,
    date: "2026-05-01",
    name: "Hari Buruh Internasional",
    category: "public",
    states: ["Nasional"],
    description: "International Workers' Day"
  },
  {
    id: 15,
    date: "2026-05-14",
    name: "Kenaikan Yesus Kristus",
    category: "public",
    states: ["Nasional"],
    description: "Christian celebration of Jesus' ascension to heaven"
  },
  {
    id: 16,
    date: "2026-05-15",
    name: "Cuti Bersama Kenaikan Yesus Kristus",
    category: "joint",
    states: ["Nasional"],
    description: "Collective leave day after Ascension Day"
  },
  {
    id: 17,
    date: "2026-05-27",
    name: "Hari Raya Idul Adha 1447H",
    category: "public",
    states: ["Nasional"],
    description: "Festival of Sacrifice"
  },
  {
    id: 18,
    date: "2026-05-28",
    name: "Cuti Bersama Idul Adha",
    category: "joint",
    states: ["Nasional"],
    description: "Collective leave day after Eid al-Adha"
  },
  {
    id: 19,
    date: "2026-05-31",
    name: "Hari Raya Waisak 2570 BE",
    category: "public",
    states: ["Nasional"],
    description: "Buddha's Birthday - Birth, Enlightenment, and Parinirvana"
  },
  {
    id: 20,
    date: "2026-06-01",
    name: "Hari Lahir Pancasila",
    category: "public",
    states: ["Nasional"],
    description: "Commemoration of Pancasila, Indonesia's philosophical foundation"
  },
  {
    id: 21,
    date: "2026-06-16",
    name: "Tahun Baru Islam 1448H",
    category: "public",
    states: ["Nasional"],
    description: "First day of Muharram in the Islamic calendar"
  },
  {
    id: 22,
    date: "2026-08-17",
    name: "Hari Kemerdekaan RI",
    category: "public",
    states: ["Nasional"],
    description: "Indonesia's Independence Day - 17 August 1945"
  },
  {
    id: 23,
    date: "2026-08-25",
    name: "Maulid Nabi Muhammad SAW",
    category: "public",
    states: ["Nasional"],
    description: "Birthday of Prophet Muhammad"
  },
  {
    id: 24,
    date: "2026-12-24",
    name: "Cuti Bersama Natal",
    category: "joint",
    states: ["Nasional"],
    description: "Collective leave day before Christmas"
  },
  {
    id: 25,
    date: "2026-12-25",
    name: "Hari Raya Natal",
    category: "public",
    states: ["Nasional"],
    description: "Christian celebration of Jesus' birth"
  }
];

export const categories = [
  { id: 'all', name: 'Semua Hari Libur', nameEn: 'All Holidays', color: 'blue' },
  { id: 'public', name: 'Libur Nasional', nameEn: 'Public Holidays', color: 'red' },
  { id: 'joint', name: 'Cuti Bersama', nameEn: 'Joint Holidays', color: 'amber' },
];

// Indonesian provinces (for future use)
export const states = [
  "Nasional",
  "Aceh",
  "Sumatera Utara",
  "Sumatera Barat",
  "Riau",
  "Kepulauan Riau",
  "Jambi",
  "Sumatera Selatan",
  "Bangka Belitung",
  "Bengkulu",
  "Lampung",
  "DKI Jakarta",
  "Jawa Barat",
  "Banten",
  "Jawa Tengah",
  "DI Yogyakarta",
  "Jawa Timur",
  "Bali",
  "Nusa Tenggara Barat",
  "Nusa Tenggara Timur",
  "Kalimantan Barat",
  "Kalimantan Tengah",
  "Kalimantan Selatan",
  "Kalimantan Timur",
  "Kalimantan Utara",
  "Sulawesi Utara",
  "Sulawesi Tengah",
  "Sulawesi Selatan",
  "Sulawesi Tenggara",
  "Gorontalo",
  "Sulawesi Barat",
  "Maluku",
  "Maluku Utara",
  "Papua",
  "Papua Barat",
  "Papua Selatan",
  "Papua Pegunungan",
  "Papua Barat Daya"
];
