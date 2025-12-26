import { useState } from 'react';
import type { ReportType } from '../types';
import './FinancialForm.css';

interface FinancialFormProps {
  onSubmit: (year: string, reportType: ReportType) => void;
  loading: boolean;
}

export const FinancialForm = ({ onSubmit, loading }: FinancialFormProps) => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(String(currentYear - 1));
  const [reportType, setReportType] = useState<ReportType>('11011');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(year, reportType);
  };

  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  return (
    <form className="financial-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="year">사업연도</label>
        <select
          id="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          disabled={loading}
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y}년
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="reportType">보고서 유형</label>
        <select
          id="reportType"
          value={reportType}
          onChange={(e) => setReportType(e.target.value as ReportType)}
          disabled={loading}
        >
          <option value="11011">사업보고서</option>
          <option value="11012">반기보고서</option>
          <option value="11013">1분기보고서</option>
          <option value="11014">3분기보고서</option>
        </select>
      </div>

      <button type="submit" className="submit-button" disabled={loading}>
        {loading ? '조회 중...' : '재무 데이터 조회'}
      </button>
    </form>
  );
};

