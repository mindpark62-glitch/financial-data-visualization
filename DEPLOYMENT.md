# 🚀 배포 가이드

## Vercel 배포

### 1. Vercel 계정 준비

1. [Vercel](https://vercel.com) 회원가입
2. GitHub 계정 연동

### 2. 프로젝트 배포

#### 방법 1: GitHub 연동 (권장)

1. GitHub에 프로젝트 푸시
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin [your-repo-url]
   git push -u origin main
   ```

2. Vercel 대시보드에서 "New Project" 클릭
3. GitHub 저장소 선택
4. 환경변수 설정:
   - `VITE_OPENDART_API_KEY`: OpenDart API 키
   - `VITE_GEMINI_API_KEY`: Gemini API 키
5. "Deploy" 클릭

#### 방법 2: Vercel CLI

```bash
# Vercel CLI 설치
npm i -g vercel

# 로그인
vercel login

# 배포
vercel

# 프로덕션 배포
vercel --prod
```

### 3. 환경변수 설정

Vercel 대시보드 → 프로젝트 → Settings → Environment Variables

추가할 변수:
- `VITE_OPENDART_API_KEY`: [OpenDart API 키]
- `VITE_GEMINI_API_KEY`: [Gemini API 키]

**중요**: 
- Production, Preview, Development 모두 체크
- 변경 후 재배포 필요

### 4. 도메인 설정 (선택사항)

1. Vercel 대시보드 → 프로젝트 → Settings → Domains
2. 커스텀 도메인 추가
3. DNS 설정 (Vercel에서 제공하는 가이드 따라하기)

## 기타 플랫폼 배포

### Netlify

1. [Netlify](https://netlify.com) 로그인
2. "Add new site" → "Import an existing project"
3. GitHub 저장소 연결
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Environment variables 설정
6. Deploy

### GitHub Pages

```bash
# gh-pages 패키지 설치
npm install --save-dev gh-pages

# package.json에 추가
{
  "homepage": "https://[username].github.io/[repo-name]",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}

# 배포
npm run deploy
```

**주의**: GitHub Pages는 환경변수를 지원하지 않으므로 권장하지 않습니다.

## 배포 전 체크리스트

- [ ] `.env` 파일이 `.gitignore`에 포함되어 있는지 확인
- [ ] API 키가 코드에 하드코딩되지 않았는지 확인
- [ ] `npm run build`가 성공적으로 실행되는지 확인
- [ ] `public/corp.xml` 파일이 포함되어 있는지 확인
- [ ] 프로덕션 환경변수가 올바르게 설정되었는지 확인
- [ ] 빌드된 파일이 정상적으로 작동하는지 로컬에서 테스트 (`npm run preview`)

## 배포 후 확인사항

1. **회사 검색 기능**
   - 검색창에 "삼성전자" 입력
   - 자동완성이 작동하는지 확인

2. **재무 데이터 조회**
   - 회사 선택 후 데이터 조회
   - 차트와 테이블이 정상 표시되는지 확인

3. **AI 분석**
   - AI 분석 버튼 클릭
   - 분석 결과가 정상 표시되는지 확인

4. **반응형 디자인**
   - 모바일, 태블릿, 데스크톱에서 테스트
   - 레이아웃이 깨지지 않는지 확인

## 문제 해결

### 빌드 실패

```bash
# 의존성 재설치
rm -rf node_modules package-lock.json
npm install

# 빌드 재시도
npm run build
```

### 환경변수 인식 안 됨

- Vite는 `VITE_` 접두사가 필요합니다
- 환경변수 변경 후 재배포 필요
- 브라우저 캐시 삭제 후 재확인

### CORS 에러

- OpenDart API는 CORS를 지원합니다
- Gemini API도 클라이언트에서 호출 가능
- 에러가 계속되면 API 키 확인

### 404 에러

- `vercel.json`에 리다이렉트 설정 확인
- SPA 라우팅 설정 확인

## 성능 최적화

### 1. 이미지 최적화

현재 프로젝트는 이미지를 사용하지 않지만, 추가 시:
- WebP 형식 사용
- 적절한 크기로 리사이징
- Lazy loading 적용

### 2. 코드 스플리팅

```typescript
// 필요한 경우 동적 import 사용
const AIAnalysis = lazy(() => import('./components/AIAnalysis'));
```

### 3. 캐싱 전략

- corp.xml은 이미 메모리 캐싱 적용
- API 응답은 필요시 localStorage 활용 가능

## 모니터링

### Vercel Analytics

1. Vercel 대시보드 → 프로젝트 → Analytics
2. 방문자 수, 페이지 뷰 등 확인

### 에러 추적

```typescript
// 프로덕션 환경에서 에러 로깅
if (import.meta.env.PROD) {
  window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    // 에러 추적 서비스로 전송 (예: Sentry)
  });
}
```

## 비용 관리

### Vercel
- Hobby 플랜: 무료
- 제한: 월 100GB 대역폭, 빌드 시간 제한
- 초과 시 Pro 플랜 고려

### API 비용
- **OpenDart**: 무료 (일일 20,000건 제한)
- **Gemini**: 무료 티어 있음 (분당 요청 제한)

## 보안

### API 키 보호
- 환경변수로만 관리
- 클라이언트 사이드에서 노출되지만, 도메인 제한 설정 권장

### HTTPS
- Vercel은 자동으로 HTTPS 제공
- 커스텀 도메인도 자동 SSL 인증서 발급

## 업데이트 배포

```bash
# 변경사항 커밋
git add .
git commit -m "Update features"
git push

# Vercel이 자동으로 재배포
```

## 롤백

Vercel 대시보드에서:
1. Deployments 탭
2. 이전 배포 선택
3. "Promote to Production" 클릭

---

**배포 성공을 기원합니다! 🚀**

