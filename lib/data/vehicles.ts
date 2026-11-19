export type HolidayVehicle = {
  id: string;
  name: string;
  category: "Coach" | "Bus" | "Mini Bus" | "Traveller";
  seats: number;
  description: string;
  features: string[];
  /** Demo daily rate in INR — confirm on WhatsApp */
  demoRateInr: number;
  image: string;
  imageAlt: string;
  available: boolean;
};

/**
 * Koofiya Holidays vehicle fleet for booking enquiries.
 * Rates are demo values — final quote confirmed on WhatsApp.
 */
export const holidayVehicles: HolidayVehicle[] = [
  {
    id: "armenia-coach",
    name: "Armenia Coach",
    category: "Coach",
    seats: 45,
    description:
      "Spacious Armenia coach suited for group tours, temple trips and long-distance holiday travel.",
    features: ["AC", "Reclining seats", "Luggage space", "Ideal for large groups"],
    demoRateInr: 12000,
    image: "/images/vehicles/koofiya-holidays.jpg",
    imageAlt: "Koofiya Holidays travel vehicle for group holiday booking",
    available: true,
  },
  {
    id: "luxury-coach",
    name: "Luxury Coach",
    category: "Coach",
    seats: 35,
    description:
      "Comfort-focused luxury coach for premium group journeys and outstation holidays.",
    features: ["AC", "Push-back seats", "Music system", "Comfortable for long routes"],
    demoRateInr: 15000,
    image: "/images/vehicles/luxury-coach.jpg",
    imageAlt: "Luxury coach for premium holiday travel",
    available: true,
  },
  {
    id: "ac-bus",
    name: "AC Tourist Bus",
    category: "Bus",
    seats: 40,
    description:
      "Reliable AC tourist bus for school trips, family gatherings and destination packages.",
    features: ["AC", "Ample seating", "Group-friendly", "Flexible itineraries"],
    demoRateInr: 10000,
    image: "/images/vehicles/ac-bus.jpg",
    imageAlt: "AC tourist bus for holiday groups",
    available: true,
  },
  {
    id: "mini-bus",
    name: "Mini Bus",
    category: "Mini Bus",
    seats: 20,
    description:
      "Compact mini bus for mid-size groups — city tours, short getaways and local sightseeing.",
    features: ["AC", "Easy city access", "Mid-size groups", "Quick booking"],
    demoRateInr: 6500,
    image: "/images/vehicles/mini-bus.jpg",
    imageAlt: "Mini bus for mid-size holiday groups",
    available: true,
  },
  {
    id: "tempo-traveller",
    name: "Tempo Traveller",
    category: "Traveller",
    seats: 12,
    description:
      "Popular traveller option for families and small groups exploring destinations together.",
    features: ["AC", "Family-friendly", "Flexible stops", "Ideal for 8–12 travellers"],
    demoRateInr: 4500,
    image: "/images/vehicles/tempo-traveller.jpg",
    imageAlt: "Tempo traveller for family holiday trips",
    available: true,
  },
];

export function formatVehicleRate(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getVehicleById(id: string): HolidayVehicle | undefined {
  return holidayVehicles.find((v) => v.id === id);
}
