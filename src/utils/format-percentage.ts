export function formatPercentage(value?: number, decimals: number = 2): string {
  if (value === undefined || value === null || isNaN(value)) return "0%";
  return `${value.toFixed(decimals)}%`;
}