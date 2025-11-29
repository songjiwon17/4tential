# 4tential 

> **운동 초보자를 위한 미래 체형 예측 기반 동기부여 플랫폼**

운동을 시작하고 싶지만 결과가 보이지 않아 쉽게 포기하시나요?  
저희의 프로젝트는 당신의 **미래 체형**을 미리 보여주고, 지속적인 운동 동기를 제공하는 플랫폼입니다.

## 📌 팀 소개

4tential(포텐셜)은 'Four + Potential'의 합성어로, 
4명의 잠재력이 모여 무한한 가능성을 만들자! 라는 취지에서 결정된 팀 이름입니다.

### 주요 기능

- **미래 체형 시뮬레이션**: 현재 신체 정보를 입력하면 운동 목표에 따른 미래 모습을 생성
- **운동 추천**: 선택한 운동 목표에 대해 적합한 운동 추천, Youtube를 통한 가이드 연결
- **식단 검색**: 궁금한 음식에 대한 영양정보 검색

## 🎯 타겟 사용자

- 운동을 시작하고 싶지만 막연한 초보자
- 빠른 결과를 보지 못해 운동을 포기했던 사람
- 구체적인 목표 설정이 어려운 사람
- 시각적 동기부여가 필요한 사람

## 🛠️ 기술 스택
- React
- Jotai
- Chakra UI
- React Query

## 📦 설치 및 실행

### 사전 요구사항
```bash
Node.js >= 18.0.0
npm >= 9.0.0
```

### 빠른 시작 (Quick Start)

**가장 간단한 실행 방법:**

```bash
# 1. 저장소 클론
git clone https://github.com/songjiwon17/4tential.git
cd 4tential

# 2. 의존성 설치
npm install

# 3. 개발 서버 실행
npm start
```

브라우저에서 `http://localhost:3000` 으로 접속하면 애플리케이션이 실행됩니다.

> ⚠️ **주의**: 위 방법으로 실행되지 않는 경우, 아래의 상세 설치 가이드를 참고해주세요.

---

### 상세 설치 가이드

#### 1️⃣ 저장소 클론
```bash
git clone https://github.com/songjiwon17/4tential.git
cd 4tential
```

#### 2️⃣ 환경 변수 설정 (필요한 경우)
```bash
# .env.example 파일이 있다면 복사하여 사용
cp .env.example .env

# .env 파일을 열어 필요한 값 입력
1. 프로젝트 최상위에 .env파일 만들기
2. 파일 내에 

FOOD_API_KEY="12ac7ec693b1e32b87a926bf6b4dd33315cd0c1c959c8af8c64bb1c0e9924ea8" 
    
  입력 후 저장
# 예: API 키, 데이터베이스 연결 정보 등
```

#### 3️⃣ 프론트엔드 설치 및 실행
```bash

# 의존성 설치
npm install

# 개발 서버 실행
npm start
# 또는
npm run dev
```

---

### 문제 해결 (Troubleshooting)

#### `npm install` 실행 시 오류가 발생하는 경우
```bash
# npm 캐시 정리
npm cache clean --force

# node_modules 폴더 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install
```

#### 포트가 이미 사용 중인 경우
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID [PID번호] /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

#### Node.js 버전이 맞지 않는 경우
```bash
# Node.js 버전 확인
node -v

# nvm을 사용하여 버전 변경 (nvm 설치 필요)
nvm install 18
nvm use 18
```
## 🚀 주요 화면

### 1. 프로필 설정
- 기본 정보 입력 (키, 몸무게, 나이, 성별)
- 운동 목표 설정 (근육 증가, 체중 감량, 체력 향상 등)

### 2. 미래 체형 미리보기
- 프로필 정보를 기반으로 생성한 3개월, 6개월, 1년 후 예상 체형
- 타임라인 슬라이더로 변화 과정 확인

### 3. 운동 및 식단 추천
- 운동 목표별 맞춤 운동 및 식단 추천
- 각 운동별 Youtube 가이드 영상 링크 연결

### 4. 식단 검색
- 각 음식 영양소 검색 기능
- 해당 음식 영양소 수치를 기반으로 추천/비추천 표시

## 팀 인원

- **송지원**
- **문경수**
- **이승비**
- **강동명**
