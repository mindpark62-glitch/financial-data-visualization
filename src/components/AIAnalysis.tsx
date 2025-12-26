import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './AIAnalysis.css';

interface AIAnalysisProps {
  analysis: string | null;
  loading: boolean;
  onAnalyze: () => void;
}

export const AIAnalysis = ({ analysis, loading, onAnalyze }: AIAnalysisProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="ai-analysis-container">
      <div className="analysis-header">
        <h3>
          <span className="ai-icon">🤖</span> AI 재무 분석
        </h3>
        <button
          className="toggle-button"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? '접기 ▲' : '펼치기 ▼'}
        </button>
      </div>

      {isExpanded && (
        <div className="analysis-content">
          {!analysis && !loading && (
            <div className="analysis-placeholder">
              <p>AI가 재무 데이터를 쉽게 분석해드립니다.</p>
              <button className="analyze-button" onClick={onAnalyze}>
                AI 분석 시작하기
              </button>
            </div>
          )}

          {loading && (
            <div className="analysis-loading">
              <div className="loading-spinner"></div>
              <p>AI가 재무 데이터를 분석하고 있습니다...</p>
            </div>
          )}

          {analysis && !loading && (
            <div className="analysis-result">
              <ReactMarkdown>{analysis}</ReactMarkdown>
              <button className="reanalyze-button" onClick={onAnalyze}>
                다시 분석하기
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

