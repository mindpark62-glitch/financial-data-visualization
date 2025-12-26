import { useState, useEffect } from 'react';
import type { CorpInfo } from '../types';
import { searchCorp } from '../services/corpService';
import './CompanySearch.css';

interface CompanySearchProps {
  onSelectCompany: (corp: CorpInfo) => void;
}

export const CompanySearch = ({ onSelectCompany }: CompanySearchProps) => {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState<CorpInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (keyword.trim().length < 2) {
        setResults([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const searchResults = await searchCorp(keyword);
        setResults(searchResults);
      } catch (err) {
        setError('검색 중 오류가 발생했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [keyword]);

  const handleSelect = (corp: CorpInfo) => {
    onSelectCompany(corp);
    setKeyword('');
    setResults([]);
  };

  return (
    <div className="company-search">
      <div className="search-input-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="회사명 또는 종목코드를 입력하세요 (예: 삼성전자, 005930)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        {loading && <div className="search-loading">검색 중...</div>}
      </div>

      {error && <div className="search-error">{error}</div>}

      {results.length > 0 && (
        <div className="search-results">
          {results.map((corp) => (
            <div
              key={corp.corp_code}
              className="search-result-item"
              onClick={() => handleSelect(corp)}
            >
              <div className="corp-name">{corp.corp_name}</div>
              <div className="corp-details">
                <span className="stock-code">{corp.stock_code || 'N/A'}</span>
                <span className="corp-code">코드: {corp.corp_code}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

