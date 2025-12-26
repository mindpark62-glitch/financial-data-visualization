export const formatAmount = (amount: string | number): number => {
  if (typeof amount === 'number') return amount;
  const cleaned = amount.replace(/,/g, '');
  return parseInt(cleaned, 10);
};

export const formatCurrency = (amount: number): string => {
  if (amount >= 1_000_000_000_000) {
    return `${(amount / 1_000_000_000_000).toFixed(1)}조`;
  }
  if (amount >= 100_000_000) {
    return `${(amount / 100_000_000).toFixed(0)}억`;
  }
  return amount.toLocaleString('ko-KR');
};

export const calculateGrowthRate = (current: number, previous: number): string => {
  if (previous === 0) return 'N/A';
  const rate = ((current - previous) / previous) * 100;
  return `${rate > 0 ? '+' : ''}${rate.toFixed(1)}%`;
};

