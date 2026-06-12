export function toPersianDigits(input: string | number): string {
  const map = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return String(input).replace(/\d/g, (d) => map[Number(d)]);
}

export function formatPrice(toman: number): string {
  return toPersianDigits(toman.toLocaleString("en-US")) + " تومان";
}

export function formatNumber(n: number): string {
  return toPersianDigits(n.toLocaleString("en-US"));
}
