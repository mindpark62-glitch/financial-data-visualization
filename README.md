# 📊 재무 데이터 시각화 분석 서비스

누구나 쉽게 이해할 수 있는 기업 재무 데이터 시각화 및 AI 분석 서비스

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mindpark62-glitch/financial-data-visualization&env=VITE_OPENDART_API_KEY,VITE_GEMINI_API_KEY&envDescription=API%20Keys%20for%20OpenDart%20and%20Gemini&envLink=https://github.com/mindpark62-glitch/financial-data-visualization/blob/master/DEPLOY_NOW.md)

## 🚀 빠른 배포

### 원클릭 배포 (1분)

위의 **"Deploy with Vercel"** 버튼을 클릭하면:
1. Vercel이 자동으로 프로젝트를 복제
2. 환경변수 입력 화면이 나타남
3. 아래 값을 입력:

```
VITE_OPENDART_API_KEY=1e0c74ab85c2a003495483edc131f2d52210fafe
VITE_GEMINI_API_KEY=AIzaSyD1KTee-8aXQMw422UwYRexbU7UgJpnZa0
```

4. "Deploy" 클릭
5. 완료! 🎉

---

## ✨ 주요 기능

### 1. 회사 검색 🔍
- 60개 이상의 주요 상장 회사 지원
- 회사명, 영문명, 종목코드로 검색
- 실시간 자동완성

### 2. 재무 데이터 조회 📈
- OpenDart API 연동
- 2015년 이후 데이터 제공
- 사업보고서, 반기/분기 보고서 지원
- 연결/개별 재무제표 구분

### 3. 데이터 시각화 📊
- Recharts를 활용한 인터랙티브 차트
- 당기/전기/전전기 비교
- 상세 재무 테이블
- 증감률 자동 계산

### 4. AI 재무 분석 🤖
- Google Gemini 2.5 Flash 활용
- 일반인도 이해하기 쉬운 설명
- 긍정/부정 측면 분석
- 종합 평가 제공

---

## 🛠️ 기술 스택

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **차트**: Recharts
- **API**: OpenDart, Google Gemini
- **배포**: Vercel

---

## 🎯 사용 방법

### 1. 회사 검색
검색창에 회사명 입력 (예: "삼성전자")

### 2. 재무 데이터 조회
- 사업연도 선택 (2015년 이후)
- 보고서 유형 선택
- "재무 데이터 조회" 클릭

### 3. 시각화 확인
- 차트에서 주요 지표 확인
- 테이블에서 상세 내역 확인

### 4. AI 분석
- "AI 분석 시작하기" 클릭
- 쉬운 설명 확인

---

## 📋 등록된 회사 (60개 이상)

### 주요 그룹
- **삼성**: 삼성전자, 삼성SDI, 삼성바이오로직스 등 9개
- **SK**: SK하이닉스, SK텔레콤, SK이노베이션 등 5개
- **현대차**: 현대자동차, 현대모비스, 기아 등 4개
- **LG**: LG전자, LG화학, LG에너지솔루션 등 4개

### 산업별
- IT/게임, 금융, 제약/바이오, 제조/화학 등

상세 목록: [COMPANY_LIST.md](COMPANY_LIST.md)

---

## 💻 로컬 개발

### 설치
```bash
npm install
```

### 환경변수 설정
`.env` 파일 생성:
```env
VITE_OPENDART_API_KEY=your_opendart_api_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

### 개발 서버 실행
```bash
npm run dev
```

### 빌드
```bash
npm run build
```

---

## 🌐 배포

### Vercel (권장)
1. 위의 "Deploy with Vercel" 버튼 클릭
2. 환경변수 입력
3. Deploy 클릭

### 수동 배포
상세 가이드: [DEPLOYMENT.md](DEPLOYMENT.md)

---

## 📚 문서

- [빠른 시작](QUICK_START.md)
- [사용 가이드](GUIDE.md)
- [배포 가이드](DEPLOYMENT.md)
- [회사 목록](COMPANY_LIST.md)
- [문제 해결](TROUBLESHOOTING.md)
- [API 수정 가이드](API_FIX_GUIDE.md)

---

## 🎓 테스트 시나리오

### 시나리오 1: 삼성전자
```
1. "삼성전자" 검색
2. 2018년 사업보고서 조회
3. 차트 확인
4. AI 분석 실행
```

### 시나리오 2: IT 기업 비교
```
1. 네이버 조회
2. 카카오 조회
3. 재무 구조 비교
```

---

## 🔒 보안

- API 키는 환경변수로 관리
- `.env` 파일은 Git에 포함되지 않음
- Vercel 환경변수로 안전하게 관리

---

## 📊 성능

- 빌드 시간: ~4초
- 번들 크기: 732KB (gzip: 229KB)
- 서버 시작: <400ms
- 검색 응답: <300ms

---

## 🤝 기여

이슈와 풀 리퀘스트는 언제나 환영합니다!

---

## 📝 라이선스

MIT License

---

## 🎉 데모

### GitHub 저장소
https://github.com/mindpark62-glitch/financial-data-visualization

### 배포된 사이트
배포 후 URL이 여기에 표시됩니다.

---

## 📞 문의

문제가 발생하면 GitHub Issues에 등록해주세요.

---

**Made with ❤️ using React + TypeScript + Vite**
