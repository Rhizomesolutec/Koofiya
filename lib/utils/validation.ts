/** Indian mobile: 10 digits starting with 6–9, optional +91 / 91 / 0 prefix */
export function isValidIndianMobile(value: string): boolean {
  const cleaned = value.replace(/[\s-]/g, "");
  const match = cleaned.match(/^(?:\+?91|0)?([6-9]\d{9})$/);
  return Boolean(match);
}

export function normalizeIndianMobile(value: string): string {
  const cleaned = value.replace(/[\s-]/g, "");
  const match = cleaned.match(/^(?:\+?91|0)?([6-9]\d{9})$/);
  return match ? match[1] : cleaned;
}

/** Indian PIN code: exactly 6 digits, first digit 1–9 */
export function isValidIndianPin(value: string): boolean {
  return /^[1-9][0-9]{5}$/.test(value.trim());
}

export function isNonEmpty(value: string, min = 2): boolean {
  return value.trim().length >= min;
}
