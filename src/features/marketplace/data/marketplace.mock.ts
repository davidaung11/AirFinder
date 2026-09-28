import {
  AirVent,
  Building2,
  Droplets,
  Fan,
  FlaskConical,
  Gauge,
  Settings2,
  Wind,
} from "lucide-react";

export const marketplaceServices = [
  {
    name: "AC Cleaning",
    description:
      "Filter wash, coil cleaning, drain clearing, and casing sanitization.",
    price: "฿500 / unit",
    icon: Fan,
  },
  {
    name: "Repair & Inspection",
    description:
      "Diagnosis for leaks, unusual noise, weak cooling, and electrical faults.",
    price: "From ฿300",
    icon: Settings2,
  },
  {
    name: "Installation",
    description:
      "Mounting, copper pipe, vacuum test, wiring, and commissioning.",
    price: "From ฿1,500",
    icon: AirVent,
  },
  {
    name: "Refrigerant Refill",
    description: "Leak check and measured R32 or R410A refrigerant top-up.",
    price: "From ฿800",
    icon: Gauge,
  },
  {
    name: "Water Leak Repair",
    description:
      "Drain blockage removal, insulation repair, and water flow testing.",
    price: "From ฿650",
    icon: Droplets,
  },
  {
    name: "Chemical Deep Wash",
    description:
      "Detailed disassembly and chemical cleaning for heavily soiled units.",
    price: "From ฿900",
    icon: FlaskConical,
  },
  {
    name: "Relocation",
    description:
      "Safe removal, transport preparation, and reinstallation support.",
    price: "From ฿1,800",
    icon: Wind,
  },
  {
    name: "Commercial Inspection",
    description:
      "Practical checks for cassette, multi-split, and light commercial systems.",
    price: "Request quote",
    icon: Building2,
  },
];

export const marketplaceProfessionals = [
  {
    name: "Somchai Air Service",
    type: "Individual Professional",
    area: "Bang Na",
    rating: 4.9,
    reviews: 126,
    experience: 8,
    distance: 2.8,
    availability: "Available Today",
    providerType: "Individual",
    verified: true,
    services: ["AC Cleaning", "Repair", "Gas Refill"],
    startingPrice: 500,
    price: "From ฿500",
    initials: "SA",
    color: "bg-sky-100 text-sky-800",
  },
  {
    name: "CoolFix Team Bangkok",
    type: "5-technician team",
    area: "Udom Suk",
    rating: 4.8,
    reviews: 92,
    experience: 6,
    distance: 4.1,
    availability: "Available Tomorrow",
    providerType: "Team",
    verified: true,
    services: ["AC Cleaning", "Installation", "Maintenance"],
    startingPrice: 550,
    price: "From ฿550",
    initials: "CF",
    color: "bg-indigo-100 text-indigo-800",
  },
  {
    name: "Bangkok Cooling Solutions",
    type: "Registered Company",
    area: "Bangkok & Samut Prakan",
    rating: 4.9,
    reviews: 218,
    experience: 14,
    distance: 7.5,
    availability: "Available Today",
    providerType: "Company",
    verified: true,
    services: ["Commercial AC", "Installation", "Repair"],
    startingPrice: 600,
    price: "From ฿600",
    initials: "BC",
    color: "bg-cyan-100 text-cyan-800",
  },
];

export type MarketplaceProfessional = (typeof marketplaceProfessionals)[number];

export const marketplaceLocations = [
  "Bang Na",
  "Udom Suk",
  "On Nut",
  "Sukhumvit",
  "Phra Khanong",
  "Prawet",
  "Lat Phrao",
  "Samut Prakan",
];
