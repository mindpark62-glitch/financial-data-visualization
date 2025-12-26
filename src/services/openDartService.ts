import axios from 'axios';
import type { OpenDartResponse, FinancialData, SearchParams } from '../types';

// 개발 환경에서는 프록시 사용, 프로덕션에서는 직접 호출
const API_BASE_URL = import.meta.env.DEV 
  ? '/api' 
  : 'https://opendart.fss.or.kr/api';
const API_KEY = import.meta.env.VITE_OPENDART_API_KEY;

export const getFinancialData = async ({
  corpCode,
  year,
  reportType,
}: SearchParams): Promise<FinancialData[]> => {
  console.log('🔍 OpenDart API 요청 시작:', { corpCode, year, reportType });
  
  if (!API_KEY) {
    console.error('❌ API 키가 없습니다.');
    throw new Error('OpenDart API 키가 설정되지 않았습니다. .env 파일을 확인하세요.');
  }

  console.log('🔑 API 키:', API_KEY.substring(0, 10) + '...');

  try {
    const url = `${API_BASE_URL}/fnlttSinglAcnt.json`;
    const params = {
      crtfc_key: API_KEY,
      corp_code: corpCode,
      bsns_year: year,
      reprt_code: reportType,
    };

    console.log('📡 요청 URL:', url);
    console.log('📋 요청 파라미터:', params);

    const response = await axios.get<OpenDartResponse>(url, {
      params,
      timeout: 30000, // 30초 타임아웃
      headers: {
        'Accept': 'application/json',
      },
    });

    console.log('📥 응답 상태:', response.data.status);
    console.log('📥 응답 메시지:', response.data.message);

    if (response.data.status !== '000') {
      const errorMessages: Record<string, string> = {
        '010': 'API 키가 등록되지 않았습니다. OpenDart에서 API 키를 확인하세요.',
        '011': 'API 키가 일시적으로 사용 중지되었습니다.',
        '012': 'IP 주소가 허용되지 않습니다.',
        '013': '조회된 데이터가 없습니다. 다른 연도나 보고서를 선택해보세요.',
        '014': '파일이 존재하지 않습니다.',
        '020': '일일 요청 제한(20,000건)을 초과했습니다. 내일 다시 시도하세요.',
        '021': '조회 가능한 회사 개수를 초과했습니다.',
        '100': '잘못된 값이 입력되었습니다.',
        '800': '시스템 점검 중입니다.',
        '900': '정의되지 않은 오류가 발생했습니다.',
      };
      
      const errorMsg = errorMessages[response.data.status] || response.data.message || '데이터 조회 실패';
      console.error('❌ API 에러:', errorMsg);
      throw new Error(errorMsg);
    }

    if (!response.data.list || response.data.list.length === 0) {
      console.warn('⚠️ 빈 데이터');
      throw new Error('조회된 데이터가 없습니다. 해당 연도의 보고서가 제출되지 않았을 수 있습니다.');
    }

    console.log('✅ 데이터 조회 성공:', response.data.list.length, '개 항목');
    return response.data.list;
  } catch (error) {
    console.error('❌ API 요청 중 오류:', error);
    
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('요청 시간이 초과되었습니다. 네트워크 연결을 확인하세요.');
      }
      if (error.code === 'ERR_NETWORK') {
        throw new Error('네트워크 연결에 실패했습니다. 인터넷 연결을 확인하세요.');
      }
      if (error.response?.status === 404) {
        throw new Error('API 엔드포인트를 찾을 수 없습니다.');
      }
      if (error.response?.status === 500) {
        throw new Error('OpenDart 서버 오류입니다. 잠시 후 다시 시도하세요.');
      }
      
      const errorMsg = error.response?.data?.message || error.message;
      throw new Error(`API 요청 실패: ${errorMsg}`);
    }
    
    throw error;
  }
};

export const getReportTypeName = (code: string): string => {
  const reportTypes: Record<string, string> = {
    '11011': '사업보고서',
    '11012': '반기보고서',
    '11013': '1분기보고서',
    '11014': '3분기보고서',
  };
  return reportTypes[code] || code;
};

