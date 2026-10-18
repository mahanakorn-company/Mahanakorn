/** Client-side checks that mirror the backend rules, so people see problems before submitting. */
export const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
export const phoneOk = (v: string) => {
  const digits = v.replace(/\D/g, '');
  return /^\+?[\d\s\-()]{7,24}$/.test(v.trim()) && digits.length >= 7 && digits.length <= 15;
};
export const nameOk = (v: string) => v.trim().length >= 2 && v.trim().length <= 80;

export function monthOk(v: string) {
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(v)) return 'Please choose a month and year.';
  const [y, m] = v.split('-').map(Number);
  const now = new Date();
  const chosen = y * 12 + (m - 1);
  const current = now.getFullYear() * 12 + now.getMonth();
  if (chosen < current) return 'That month has already passed.';
  if (chosen > current + 60) return 'Please choose a date within the next five years.';
  return '';
}

export function minMonth() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}
