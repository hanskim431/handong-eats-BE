# Handong Eats - Backend

NestJS 기반의 한동대학교 학생 식사 주문 플랫폼 백엔드 프로젝트입니다.

## 주요 기능

- 사용자 인증 및 JWT 기반 로그인
- 메뉴 조회 및 등록
- 주문 생성 및 상태 관리
- 관리자와 사용자 역할 분리
- MongoDB 연동을 통한 데이터 저장

## 기술 스택

<img src="https://skillicons.dev/icons?i=nestjs,ts,pnpm,mongodb,flutter,git,github,vscode,ubuntu,ros" />

## 폴더 구조

```
handong-eats-BE
├── src
│   ├── auth          # 인증 모듈
│   ├── menu          # 메뉴 모듈
│   ├── order         # 주문 모듈
│   ├── ...
├── test              # 유닛 테스트
├── package.json      # 프로젝트 설정
├── tsconfig.json     # TypeScript 설정
```

## 실행 방법

```bash
# 1. 패키지 설치
npm install

# 2. 환경 변수 설정 (.env 파일 작성)
# 예시:
# MONGO_URI=mongodb://localhost:27017/handong-eats
# JWT_SECRET=your_secret_key

# 3. 개발 서버 실행
npm run start:dev
```

## API 문서

Swagger 또는 Postman 문서화는 포함되어 있지 않지만, 각 컨트롤러를 통해 엔드포인트를 확인할 수 있습니다.

## 실행 화면 예시

아래는 앱 실행 화면 예시입니다.

| 로그인 화면 | 메인 메뉴 | 주문 화면 |
| ------ | ----- | ----- |
|        |       |       |

> 전체 스크린샷은 `/drive-download` 폴더 참조

## 개발자

- 팀명: Handong Eats
- 구성: 백엔드 & 프론트엔드 1명, 로봇자율주행 1명

## 라이선스

MIT License

