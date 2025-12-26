import { GoogleGenerativeAI } from '@google/generative-ai';
import type { FinancialData } from '../types';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI: GoogleGenerativeAI | null = null;

const initializeGemini = () => {
  if (!API_KEY) {
    throw new Error('Gemini API 키가 설정되지 않았습니다.');
  }
  if (!genAI) {
    genAI = new GoogleGenerativeAI(API_KEY);
  }
  return genAI;
};

export const analyzeFinancialData = async (
  companyName: string,
  year: string,
  reportType: string,
  financialData: FinancialData[]
): Promise<string> => {
  try {
    const ai = initializeGemini();
    const model = ai.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // 주요 재무 데이터 추출
    const keyAccounts = [
      '자산총계',
      '부채총계',
      '자본총계',
      '매출액',
      '영업이익',
      '당기순이익(손실)',
    ];

    const relevantData = financialData.filter((item) =>
      keyAccounts.includes(item.account_nm)
    );

    const dataForAI = relevantData.map((item) => ({
      계정명: item.account_nm,
      재무제표: item.fs_nm,
      당기: {
        기간: item.thstrm_dt,
        금액: item.thstrm_amount,
      },
      전기: {
        기간: item.frmtrm_dt,
        금액: item.frmtrm_amount,
      },
      전전기: item.bfefrmtrm_amount
        ? {
            기간: item.bfefrmtrm_dt,
            금액: item.bfefrmtrm_amount,
          }
        : null,
    }));

    const prompt = `
당신은 재무 분석 전문가입니다. 다음 재무 데이터를 분석하여 일반인도 쉽게 이해할 수 있도록 설명해주세요.

**회사명**: ${companyName}
**사업연도**: ${year}년
**보고서 유형**: ${reportType}

**재무 데이터**:
${JSON.stringify(dataForAI, null, 2)}

다음 항목을 포함하여 분석해주세요:
1. **전반적인 재무 상태 요약** (2-3문장)
2. **주요 재무 지표 변화**
   - 자산, 부채, 자본의 변화 추이
   - 매출액과 수익성 변화
3. **긍정적인 측면** (있다면)
4. **주의해야 할 점** (있다면)
5. **종합 평가** (1-2문장)

일반인이 이해하기 쉽게, 전문 용어는 최소화하고 구체적인 숫자와 비율을 활용하여 설명해주세요.
한국어로 작성하고, 마크다운 형식으로 작성해주세요.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini AI 분석 실패:', error);
    throw new Error('AI 분석에 실패했습니다. 잠시 후 다시 시도해주세요.');
  }
};

