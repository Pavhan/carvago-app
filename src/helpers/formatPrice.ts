import { formatNumber } from './formatNumber';

export function formatPrice(value: number) {
  return `${formatNumber(value)} Kč`;
}
