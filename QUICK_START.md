# ⚡ 빠른 시작 가이드

## 🚀 5분 안에 시작하기

### 1. 개발 서버 실행 (이미 실행 중!)

현재 개발 서버가 실행 중입니다:
- **URL**: http://localhost:5173
- **상태**: ✅ 실행 중

브라우저에서 위 URL로 접속하세요!

### 2. 첫 번째 검색 해보기

1. 검색창에 "삼성전자" 입력
2. 드롭다운에서 "삼성전자" 선택
3. 사업연도: 2018년
4. 보고서: 사업보고서
5. "재무 데이터 조회" 버튼 클릭

### 3. AI 분석 체험

1. 데이터 조회 완료 후
2. 아래로 스크롤
3. "AI 분석 시작하기" 버튼 클릭
4. 쉬운 설명 확인!

## 📋 체크리스트

현재 프로젝트 상태:
- ✅ React + Vite 프로젝트 생성
- ✅ 필요한 패키지 설치 완료
- ✅ 회사 검색 기능 구현
- ✅ OpenDart API 연동
- ✅ Recharts 차트 구현
- ✅ AI 분석 기능 구현
- ✅ 반응형 디자인 적용
- ✅ 환경변수 설정
- ✅ 개발 서버 실행 중

## 🎯 다음 단계

### 실제 데이터 사용하기

현재는 샘플 데이터(15개 회사)를 사용 중입니다.
전체 회사 데이터를 사용하려면:

1. [OpenDart 공시정보](https://opendart.fss.or.kr/disclosureinfo/fnltt/dwld/main.do) 접속
2. "CORPCODE.zip" 다운로드
3. 압축 해제 후 `CORPCODE.xml` → `public/corp.xml`로 복사
4. 개발 서버 재시작

### 배포하기

```bash
# 빌드 테스트
npm run build
npm run preview

# Vercel 배포
npm i -g vercel
vercel
```

## 🔧 문제 해결

### 개발 서버가 안 열려요
```bash
# 터미널에서 Ctrl+C로 종료 후
npm run dev
```

### 포트가 이미 사용 중이에요
```bash
# 다른 포트로 실행
npm run dev -- --port 3000
```

### 패키지 오류가 나요
```bash
# 재설치
rm -rf node_modules package-lock.json
npm install
```

## 📚 더 알아보기

- **상세 가이드**: GUIDE.md
- **배포 가이드**: DEPLOYMENT.md
- **프로젝트 요약**: PROJECT_SUMMARY.md
- **README**: README.md

## 💡 팁

### 개발 중 유용한 명령어
```bash
# 린트 검사
npm run lint

# 빌드
npm run build

# 프리뷰
npm run preview
```

### 브라우저 개발자 도구
- **F12**: 개발자 도구 열기
- **Console**: 에러 확인
- **Network**: API 호출 확인
- **React DevTools**: 컴포넌트 확인

### VS Code 추천 확장
- ESLint
- Prettier
- TypeScript Vue Plugin (Volar)
- Error Lens

## 🎨 테스트 시나리오

### 시나리오 1: 삼성전자 분석
1. "삼성전자" 검색
2. 2018년 사업보고서 조회
3. 차트에서 자산/부채/자본 확인
4. AI 분석으로 쉬운 설명 확인

### 시나리오 2: 네이버 비교
1. "네이버" 검색
2. 2018년 사업보고서 조회
3. 전기와 당기 비교
4. 증감률 확인

### 시나리오 3: 모바일 테스트
1. 브라우저 개발자 도구 (F12)
2. 모바일 뷰 전환 (Ctrl+Shift+M)
3. 반응형 레이아웃 확인
4. 터치 인터랙션 테스트

## 🎉 완료!

이제 재무 데이터 시각화 서비스를 사용할 준비가 되었습니다!

**즐거운 개발 되세요! 🚀**

---

**현재 시간**: 개발 서버 실행 중
**다음 작업**: 브라우저에서 http://localhost:5173 접속
**문제 발생 시**: GUIDE.md의 문제 해결 섹션 참고

