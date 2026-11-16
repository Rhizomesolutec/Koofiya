import {
  formatInr,
  lineTotalInr,
  type HoneyProduct,
  type ProductVariant,
} from "@/lib/data/product";

export type OrderDetails = {
  customerName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  message?: string;
  quantity: number;
  variant: ProductVariant;
};

export function buildHoneyOrderMessage(
  product: HoneyProduct,
  order: OrderDetails,
): string {
  const unitPrice = formatInr(order.variant.priceInr);
  const total = formatInr(
    lineTotalInr(order.variant.priceInr, order.quantity),
  );
  const notes = order.message?.trim() || "None";
  const demoLine = product.isDemoPricing
    ? "Note: Website shows demo pricing — please confirm final price."
    : null;

  return [
    "Hello Koofiya Dry Fruits!",
    "",
    "I would like to place an order.",
    "",
    `Product: ${product.name}`,
    `Variant: ${order.variant.label} (${order.variant.weightLabel})`,
    `Quantity: ${order.quantity}`,
    `Unit price: ${unitPrice}`,
    `Estimated total: ${total}`,
    demoLine,
    "",
    "Customer Details:",
    `Name: ${order.customerName}`,
    `Phone: ${order.phone}`,
    `Delivery Address: ${order.address}`,
    `City: ${order.city}`,
    `State: ${order.state}`,
    `PIN Code: ${order.pinCode}`,
    "",
    `Additional Notes: ${notes}`,
    "",
    "Please confirm my order, final amount and delivery details.",
    "",
    "Thank you!",
  ]
    .filter((line) => line !== null)
    .join("\n");
}

export type VehicleBookingDetails = {
  vehicleName: string;
  category: string;
  seats: number;
  demoRateInr: number;
  travelDate: string;
  pickup: string;
  destination: string;
  passengers: number;
  customerName: string;
  phone: string;
  message?: string;
};

export function buildVehicleBookingMessage(
  booking: VehicleBookingDetails,
): string {
  const rate = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(booking.demoRateInr);
  const notes = booking.message?.trim() || "None";

  return [
    "Hello Koofiya Holidays!",
    "",
    "I would like to book a vehicle.",
    "",
    `Vehicle: ${booking.vehicleName}`,
    `Type: ${booking.category}`,
    `Seats: ${booking.seats}`,
    `Demo rate (per day): ${rate}`,
    "",
    "Trip details:",
    `Travel date: ${booking.travelDate}`,
    `Pickup: ${booking.pickup}`,
    `Destination: ${booking.destination}`,
    `Passengers: ${booking.passengers}`,
    "",
    "Customer details:",
    `Name: ${booking.customerName}`,
    `Phone: ${booking.phone}`,
    "",
    `Additional notes: ${notes}`,
    "",
    "Note: Website shows demo rates — please confirm final quote, availability and terms.",
    "",
    "Please confirm my vehicle booking details.",
    "",
    "Thank you!",
  ].join("\n");
}

export function buildWhatsAppUrl(phoneNumber: string, message: string): string {
  const digits = phoneNumber.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function buildSimpleWhatsAppUrl(
  phoneNumber: string,
  message: string,
): string {
  return buildWhatsAppUrl(phoneNumber, message);
}

export function isWhatsAppConfigured(phoneNumber: string): boolean {
  const digits = phoneNumber.replace(/\D/g, "");
  return digits.length >= 10;
}
