import type { FinancialData } from '../types';
import { formatAmount, formatCurrency, calculateGrowthRate } from '../utils/formatters';
import './FinancialTable.css';

interface FinancialTableProps {
  data: FinancialData[];
  title: string;
}

export const FinancialTable = ({ data, title }: FinancialTableProps) => {
  const keyAccounts = [
    '유동자산',
    '비유동자산',
    '자산총계',
    '유동부채',
    '비유동부채',
    '부채총계',
    '자본총계',
    '매출액',
    '영업이익',
    '법인세차감전 순이익',
    '당기순이익(손실)',
  ];

  const tableData = keyAccounts
    .map((accountName) => {
      const item = data.find((d) => d.account_nm === accountName);
      return item;
    })
    .filter((item): item is FinancialData => item !== undefined);

  if (tableData.length === 0) {
    return null;
  }

  return (
    <div className="financial-table-container">
      <h3>{title}</h3>
      <div className="table-wrapper">
        <table className="financial-table">
          <thead>
            <tr>
              <th>계정과목</th>
              <th>당기</th>
              <th>전기</th>
              <th>증감률</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => {
              const current = formatAmount(item.thstrm_amount);
              const previous = formatAmount(item.frmtrm_amount);
              const growthRate = calculateGrowthRate(current, previous);

              return (
                <tr key={index}>
                  <td className="account-name">{item.account_nm}</td>
                  <td className="amount">{formatCurrency(current)}</td>
                  <td className="amount">{formatCurrency(previous)}</td>
                  <td className={`growth-rate ${current > previous ? 'positive' : current < previous ? 'negative' : ''}`}>
                    {growthRate}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

