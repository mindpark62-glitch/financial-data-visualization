import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { FinancialData, ChartDataPoint } from '../types';
import { formatAmount, formatCurrency } from '../utils/formatters';
import './FinancialChart.css';

interface FinancialChartProps {
  data: FinancialData[];
  title: string;
}

export const FinancialChart = ({ data, title }: FinancialChartProps) => {
  const prepareChartData = (): ChartDataPoint[] => {
    const keyAccounts = [
      '자산총계',
      '부채총계',
      '자본총계',
      '매출액',
      '영업이익',
      '당기순이익(손실)',
    ];

    return keyAccounts
      .map((accountName) => {
        const item = data.find((d) => d.account_nm === accountName);
        if (!item) return null;

        const chartPoint: ChartDataPoint = {
          name: accountName,
          당기: formatAmount(item.thstrm_amount),
          전기: formatAmount(item.frmtrm_amount),
        };

        if (item.bfefrmtrm_amount) {
          chartPoint.전전기 = formatAmount(item.bfefrmtrm_amount);
        }

        return chartPoint;
      })
      .filter((item): item is ChartDataPoint => item !== null);
  };

  const chartData = prepareChartData();

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{payload[0].payload.name}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (chartData.length === 0) {
    return (
      <div className="chart-container">
        <h3>{title}</h3>
        <p className="no-data">표시할 데이터가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-15} textAnchor="end" height={80} />
          <YAxis tickFormatter={(value) => formatCurrency(value)} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="전전기" fill="#95a5a6" name="전전기" />
          <Bar dataKey="전기" fill="#3498db" name="전기" />
          <Bar dataKey="당기" fill="#2ecc71" name="당기" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

