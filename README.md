# 📊 재무 데이터 시각화 분석 서비스

누구나 쉽게 이해할 수 있는 기업 재무 데이터 시각화 및 AI 분석 서비스입니다.

## ✨ 주요 기능

### 1. 회사 검색
- corp.xml 데이터베이스를 활용한 실시간 회사명 검색
- 회사명, 영문명, 종목코드로 검색 가능
- 자동완성 기능 제공

### 2. 재무 데이터 조회
- 금융감독원 전자공시시스템(OpenDart) API 연동
- 사업보고서, 반기보고서, 분기보고서 조회
- 연결재무제표 및 개별재무제표 지원

### 3. 데이터 시각화
- Recharts를 활용한 인터랙티브 차트
- 주요 재무 지표 비교 (자산, 부채, 자본, 매출, 영업이익 등)
- 당기/전기/전전기 비교 분석
- 상세 재무 테이블 제공

### 4. AI 재무 분석
- Google Gemini AI를 활용한 재무 분석
- 일반인도 이해하기 쉬운 설명
- 긍정적 측면과 주의사항 분석
- 종합 평가 제공

## 🛠️ 기술 스택

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **차트**: Recharts
- **API 통신**: Axios
- **AI**: Google Generative AI (Gemini)
- **XML 파싱**: xml2js
- **마크다운 렌더링**: react-markdown
- **배포**: Vercel

## 🚀 시작하기

### 필수 요구사항

- Node.js 18 이상
- npm 또는 yarn

### 설치

\`\`\`bash
# 의존성 설치
npm install

# 환경변수 설정
cp .env.example .env
\`\`\`

### 환경변수 설정

`.env` 파일에 다음 API 키를 설정하세요:

\`\`\`env
VITE_OPENDART_API_KEY=your_opendart_api_key
VITE_GEMINI_API_KEY=your_gemini_api_key
\`\`\`

#### API 키 발급 방법

1. **OpenDart API 키**
   - [OpenDart 사이트](https://opendart.fss.or.kr/) 회원가입
   - 인증키 신청 메뉴에서 발급

2. **Gemini API 키**
   - [Google AI Studio](https://aistudio.google.com/) 접속
   - API 키 생성

### 개발 서버 실행

\`\`\`bash
npm run dev
\`\`\`

브라우저에서 `http://localhost:5173` 접속

### 빌드

\`\`\`bash
npm run build
\`\`\`

### 프리뷰

\`\`\`bash
npm run preview
\`\`\`

## 📁 프로젝트 구조

\`\`\`
src/
├── components/          # React 컴포넌트
│   ├── CompanySearch.tsx       # 회사 검색
│   ├── FinancialForm.tsx       # 재무 데이터 조회 폼
│   ├── FinancialChart.tsx      # 재무 차트
│   ├── FinancialTable.tsx      # 재무 테이블
│   └── AIAnalysis.tsx          # AI 분석
├── services/           # API 서비스
│   ├── corpService.ts          # 회사 검색 서비스
│   ├── openDartService.ts      # OpenDart API
│   └── geminiService.ts        # Gemini AI API
├── types/              # TypeScript 타입 정의
│   └── index.ts
├── utils/              # 유틸리티 함수
│   └── formatters.ts           # 데이터 포맷팅
├── App.tsx             # 메인 앱 컴포넌트
└── main.tsx            # 앱 진입점

public/
└── corp.xml            # 회사 데이터베이스
\`\`\`

## 🎯 사용 방법

1. **회사 검색**: 검색창에 회사명 또는 종목코드 입력
2. **회사 선택**: 검색 결과에서 원하는 회사 클릭
3. **조회 조건 설정**: 사업연도와 보고서 유형 선택
4. **데이터 조회**: "재무 데이터 조회" 버튼 클릭
5. **시각화 확인**: 차트와 테이블로 재무 데이터 확인
6. **AI 분석**: "AI 분석 시작하기" 버튼으로 쉬운 설명 확인

## 🌐 Vercel 배포

### 환경변수 설정

Vercel 대시보드에서 다음 환경변수를 설정하세요:

- `VITE_OPENDART_API_KEY`
- `VITE_GEMINI_API_KEY`

### 배포 명령어

\`\`\`bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel
\`\`\`

또는 GitHub 연동으로 자동 배포 가능

## ⚠️ 주의사항

- API 키는 절대 공개 저장소에 커밋하지 마세요
- OpenDart API는 일일 요청 제한이 있습니다 (기본 20,000건)
- Gemini API는 무료 티어 제한이 있으니 사용량을 확인하세요
- corp.xml 파일은 정기적으로 업데이트가 필요합니다

## 📊 데이터 출처

- 재무 데이터: [금융감독원 전자공시시스템(DART)](https://dart.fss.or.kr/)
- AI 분석: [Google Gemini](https://ai.google.dev/)

## 📝 라이선스

MIT License

## 🤝 기여

이슈와 풀 리퀘스트는 언제나 환영합니다!

## 📧 문의

문제가 발생하면 이슈를 등록해주세요.
