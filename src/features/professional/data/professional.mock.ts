import type {
  Availability,
  Lead,
  NotificationSettings,
  PortfolioItem,
  ProfessionalProfile,
  ProfessionalService,
  Review,
  TeamMember,
  WalletTransaction,
} from "../types/professional.types";

export const professionalProfileMock: ProfessionalProfile = {
  id: "pro-somchai-001",
  providerType: "individual",
  name: "Somchai Air Service",
  legalName: "Somchai Prasert",
  description:
    "Independent air-conditioning specialist serving homes and condominiums across eastern Bangkok. Clear pricing, careful work, and practical advice.",
  yearsExperience: 8,
  phone: "+66 89 555 0142",
  lineAccount: "@somchaiair",
  email: "somchai@airfinder.example",
  languages: ["Thai", "English"],
  specializations: ["Inverter AC", "Deep cleaning", "Leak diagnosis"],
  baseLocation: "Bang Na, Bangkok",
  rating: 4.9,
  reviewCount: 126,
};

export const leadsMock: Lead[] = [
  {
    id: "AF-L1024",
    customerName: "David",
    service: "AC Cleaning",
    location: "Bang Na, Bangkok",
    date: "28 Sep 2026, 14:42",
    phone: "089-321-8842",
    message: "Two wall-mounted Daikin units need cleaning this week.",
    leadFee: 50,
    status: "new",
  },
  {
    id: "AF-L1021",
    customerName: "Pim",
    service: "Water Leak Repair",
    location: "Udom Suk, Bangkok",
    date: "28 Sep 2026, 12:08",
    phone: "082-555-1914",
    message: "Water drips after the AC runs for about 30 minutes.",
    leadFee: 50,
    status: "viewed",
  },
  {
    id: "AF-L1018",
    customerName: "Anan",
    service: "Chemical Deep Wash",
    location: "Prawet, Bangkok",
    date: "27 Sep 2026, 18:40",
    phone: "086-710-2203",
    message: "Looking for a deep clean for three bedroom units.",
    leadFee: 50,
    status: "contacted",
  },
  {
    id: "AF-L1012",
    customerName: "Mali",
    service: "AC Inspection",
    location: "Sukhumvit 101",
    date: "27 Sep 2026, 09:15",
    phone: "081-443-9011",
    message: "A ceiling cassette turns off and shows an error code.",
    leadFee: 50,
    status: "contacted",
  },
];

export const servicesMock: ProfessionalService[] = [
  {
    id: "service-cleaning",
    name: "AC Cleaning",
    category: "Cleaning",
    price: "฿500–700 / unit",
    priceType: "Per Unit",
    description:
      "Filter wash, coil cleaning, drain flush, and condition check.",
    active: true,
  },
  {
    id: "service-inspection",
    name: "Repair Inspection",
    category: "Repair",
    price: "From ฿300",
    priceType: "Inspection Quote",
    description:
      "On-site diagnosis with a clear repair quote before work begins.",
    active: true,
  },
  {
    id: "service-installation",
    name: "Installation",
    category: "Installation",
    price: "From ฿1,500",
    priceType: "Starting From",
    description: "Mounting, piping, vacuum test, wiring, and commissioning.",
    active: true,
  },
  {
    id: "service-gas",
    name: "Refrigerant Refill",
    category: "Maintenance",
    price: "฿800–1,800",
    priceType: "Price Range",
    description: "Leak check and R32 or R410A refrigerant top-up.",
    active: false,
  },
];

export const portfolioMock: PortfolioItem[] = [
  {
    id: "work-1",
    title: "3-Unit Condo Deep Cleaning",
    category: "AC Cleaning",
    location: "Bang Na",
    description:
      "Deep-cleaned three inverter units and cleared blocked drains.",
    completedAt: "Sep 2026",
    beforeAfter: true,
    color: "from-sky-100 to-blue-200",
  },
  {
    id: "work-2",
    title: "Living Room Inverter Installation",
    category: "Installation",
    location: "Udom Suk",
    description: "Installed a new 18,000 BTU unit with concealed piping.",
    completedAt: "Aug 2026",
    beforeAfter: false,
    color: "from-slate-100 to-cyan-100",
  },
  {
    id: "work-3",
    title: "Drain Leak Diagnosis & Repair",
    category: "Repair",
    location: "Prawet",
    description: "Replaced damaged drain insulation and tested full operation.",
    completedAt: "Aug 2026",
    beforeAfter: true,
    color: "from-blue-100 to-indigo-100",
  },
];

export const reviewsMock: Review[] = [
  {
    id: "review-1",
    customerName: "Kanya S.",
    rating: 5,
    service: "AC Cleaning",
    date: "24 Sep 2026",
    feedback:
      "Arrived on time and cleaned both units carefully. The work area was spotless afterward.",
    verified: true,
  },
  {
    id: "review-2",
    customerName: "Thanawat P.",
    rating: 5,
    service: "Water Leak Repair",
    date: "18 Sep 2026",
    feedback:
      "Explained the blocked drain clearly, fixed it quickly, and showed me how to prevent it.",
    verified: true,
    reply: "Thank you for choosing us. Happy to help!",
  },
  {
    id: "review-3",
    customerName: "May R.",
    rating: 4,
    service: "Repair Inspection",
    date: "11 Sep 2026",
    feedback:
      "Clear quote and good communication. The replacement part took one extra day.",
    verified: true,
  },
];

export const teamMembersMock: TeamMember[] = [
  {
    id: "member-1",
    name: "Somchai Prasert",
    role: "Team Lead",
    skills: ["Diagnostics", "Installation"],
    yearsExperience: 8,
    initials: "SP",
  },
  {
    id: "member-2",
    name: "Krit Sombat",
    role: "Technician",
    skills: ["Cleaning", "Repair"],
    yearsExperience: 4,
    initials: "KS",
  },
];

export const availabilityMock: Availability = {
  status: "available",
  workingDays: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  startTime: "08:00",
  endTime: "18:00",
  nextAvailableDate: "Today",
};

export const serviceAreasMock = [
  "Bang Na",
  "Udom Suk",
  "Prawet",
  "Samut Prakan",
];

export const notificationSettingsMock: NotificationSettings = {
  email: true,
  customerLeads: true,
  reviews: true,
  lowBalance: true,
};

export const walletTransactionsMock: WalletTransaction[] = [
  {
    id: "TX-2031",
    type: "top-up",
    description: "Credit top-up",
    amount: 500,
    date: "28 Sep 2026",
  },
  {
    id: "TX-2029",
    type: "lead-charge",
    description: "Customer lead AF-L1024",
    amount: -50,
    date: "28 Sep 2026",
  },
  {
    id: "TX-2026",
    type: "lead-charge",
    description: "Customer lead AF-L1021",
    amount: -50,
    date: "28 Sep 2026",
  },
  {
    id: "TX-2018",
    type: "refund",
    description: "Invalid lead refund",
    amount: 50,
    date: "25 Sep 2026",
  },
];
