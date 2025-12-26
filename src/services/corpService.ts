import axios from 'axios';
import type { CorpInfo } from '../types';

let corpDataCache: CorpInfo[] | null = null;

export const loadCorpData = async (): Promise<CorpInfo[]> => {
  if (corpDataCache) {
    return corpDataCache;
  }

  try {
    const response = await axios.get('/corp.xml', {
      responseType: 'text',
    });

    // DOMParser를 사용하여 XML 파싱 (브라우저 네이티브)
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response.data, 'text/xml');
    
    // 파싱 에러 체크
    const parserError = xmlDoc.querySelector('parsererror');
    if (parserError) {
      console.error('XML 파싱 에러:', parserError.textContent);
      throw new Error('XML 파싱 오류');
    }

    const listElements = xmlDoc.querySelectorAll('list');
    
    if (listElements.length === 0) {
      console.warn('XML에서 list 요소를 찾을 수 없습니다.');
      // 빈 배열이라도 캐시하여 반복 요청 방지
      corpDataCache = [];
      return [];
    }

    const corpList: CorpInfo[] = Array.from(listElements).map((item) => {
      const corp_code = item.querySelector('corp_code')?.textContent?.trim() || '';
      const corp_name = item.querySelector('corp_name')?.textContent?.trim() || '';
      const corp_eng_name = item.querySelector('corp_eng_name')?.textContent?.trim() || '';
      const stock_code = item.querySelector('stock_code')?.textContent?.trim() || '';
      const modify_date = item.querySelector('modify_date')?.textContent?.trim() || '';
      
      return {
        corp_code,
        corp_name,
        corp_eng_name,
        stock_code,
        modify_date,
      };
    }).filter(corp => corp.corp_code && corp.corp_name); // 유효한 데이터만 필터링

    console.log(`✅ ${corpList.length}개의 회사 데이터 로드 완료`);
    corpDataCache = corpList;
    return corpList;
  } catch (error) {
    console.error('corp.xml 로딩 실패:', error);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('corp.xml 파일을 찾을 수 없습니다. public 폴더에 파일이 있는지 확인하세요.');
      }
      throw new Error(`파일 로딩 실패: ${error.message}`);
    }
    throw new Error('회사 데이터를 불러오는데 실패했습니다.');
  }
};

export const searchCorp = async (keyword: string): Promise<CorpInfo[]> => {
  try {
    const corpList = await loadCorpData();
    
    if (!keyword.trim()) {
      return [];
    }

    const lowerKeyword = keyword.toLowerCase().trim();
    
    const results = corpList.filter(
      (corp) =>
        corp.corp_name.toLowerCase().includes(lowerKeyword) ||
        corp.corp_eng_name.toLowerCase().includes(lowerKeyword) ||
        corp.stock_code.includes(lowerKeyword)
    ).slice(0, 20); // 최대 20개만 반환
    
    console.log(`🔍 "${keyword}" 검색 결과: ${results.length}개`);
    return results;
  } catch (error) {
    console.error('검색 중 오류:', error);
    throw error;
  }
};

