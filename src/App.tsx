import { useState } from 'react';
import { CompanySearch } from './components/CompanySearch';
import { FinancialForm } from './components/FinancialForm';
import { FinancialChart } from './components/FinancialChart';
import { FinancialTable } from './components/FinancialTable';
import { AIAnalysis } from './components/AIAnalysis';
import type { CorpInfo, FinancialData, ReportType } from './types';
import { getFinancialData, getReportTypeName } from './services/openDartService';
import { analyzeFinancialData } from './services/geminiService';
import './App.css';

function App() {
  const [selectedCompany, setSelectedCompany] = useState<CorpInfo | null>(null);
  const [financialData, setFinancialData] = useState<FinancialData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState<{
    year: string;
    reportType: ReportType;
  } | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  const handleSelectCompany = (corp: CorpInfo) => {
    setSelectedCompany(corp);
    setFinancialData([]);
    setError(null);
    setAiAnalysis(null);
    setSearchParams(null);
  };

  const handleFetchFinancialData = async (year: string, reportType: ReportType) => {
    if (!selectedCompany) return;

    setLoading(true);
    setError(null);
    setAiAnalysis(null);

    try {
      const data = await getFinancialData({
        corpCode: selectedCompany.corp_code,
        year,
        reportType,
      });

      setFinancialData(data);
      setSearchParams({ year, reportType });
    } catch (err) {
      setError(err instanceof Error ? err.message : '데이터 조회 중 오류가 발생했습니다.');
      setFinancialData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedCompany || !searchParams || financialData.length === 0) return;

    setAiLoading(true);
    setError(null);

    try {
      const analysis = await analyzeFinancialData(
        selectedCompany.corp_name,
        searchParams.year,
        getReportTypeName(searchParams.reportType),
        financialData
      );
      setAiAnalysis(analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'AI 분석 중 오류가 발생했습니다.');
    } finally {
      setAiLoading(false);
    }
  };

  // 연결재무제표와 개별재무제표 분리
  const consolidatedData = financialData.filter((d) => d.fs_div === 'CFS');
  const separateData = financialData.filter((d) => d.fs_div === 'OFS');

  return (
    <div className="app">
      <header className="app-header">
        <h1>📊 재무 데이터 시각화 분석 서비스</h1>
        <p className="subtitle">누구나 쉽게 이해하는 기업 재무 분석</p>
      </header>

      <main className="app-main">
        <section className="search-section">
          <h2>1. 회사 검색</h2>
          <CompanySearch onSelectCompany={handleSelectCompany} />
          {selectedCompany && (
            <div className="selected-company">
              <h3>선택된 회사</h3>
              <div className="company-info">
                <div className="info-item">
                  <span className="label">회사명:</span>
                  <span className="value">{selectedCompany.corp_name}</span>
                </div>
                <div className="info-item">
                  <span className="label">종목코드:</span>
                  <span className="value">{selectedCompany.stock_code || 'N/A'}</span>
                </div>
                <div className="info-item">
                  <span className="label">고유번호:</span>
                  <span className="value">{selectedCompany.corp_code}</span>
                </div>
              </div>
            </div>
          )}
        </section>

        {selectedCompany && (
          <section className="data-section">
            <h2>2. 재무 데이터 조회</h2>
            <FinancialForm onSubmit={handleFetchFinancialData} loading={loading} />
          </section>
        )}

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        {financialData.length > 0 && (
          <>
            <section className="visualization-section">
              <h2>3. 재무 데이터 시각화</h2>
              
              {consolidatedData.length > 0 && (
                <>
                  <FinancialChart
                    data={consolidatedData}
                    title="📈 연결재무제표 - 주요 계정"
                  />
                  <FinancialTable
                    data={consolidatedData}
                    title="📋 연결재무제표 - 상세 내역"
                  />
                </>
              )}

              {separateData.length > 0 && (
                <>
                  <FinancialChart
                    data={separateData}
                    title="📈 개별재무제표 - 주요 계정"
                  />
                  <FinancialTable
                    data={separateData}
                    title="📋 개별재무제표 - 상세 내역"
                  />
                </>
              )}
            </section>

            <section className="analysis-section">
              <h2>4. AI 재무 분석</h2>
              <AIAnalysis
                analysis={aiAnalysis}
                loading={aiLoading}
                onAnalyze={handleAnalyze}
              />
            </section>
          </>
        )}
      </main>

      <footer className="app-footer">
        <p>데이터 출처: 금융감독원 전자공시시스템(DART)</p>
        <p>AI 분석: Google Gemini</p>
      </footer>
    </div>
  );
}

export default App;
