# 집행나침반 (Execution Compass)

승소 이후 채권 회수 의사결정 지원 플랫폼
Web-first · Data-driven · Supabase-native

---

## 1. 프로젝트 소개

**집행나침반**은
민사 소송에서 승소했음에도 불구하고
집행 절차의 복잡성·비용·정보 부족으로 인해
권리 실현을 포기하는 소액 채권자를 위한
**데이터 기반 집행 실익 분석 및 절차 안내 플랫폼**입니다.

---

## 2. 문제 정의 (Problem)

- 소액 사건(3천만 원 이하)이 전체 민사 사건의 63%
- 승소 후 채권 회수율 20% 미만 → 다수 사건 방치
- 기존 법률 서비스는 고비용·복잡한 절차로 소액 채권자 접근성 부족

👉 승소 이후 방치되는 권리를 데이터로 되찾다!

---

## 3. 해결 접근 (Approach)

- **판결문 자동 파싱** 및 **집행 실익 스코어링 알고리즘**
- Supabase 기반 데이터베이스(PostgreSQL)로 사건·사용자·집행 단계 관리
- Edge Functions로 판결문 파싱 및 분석 로직 처리
- Auth 모듈로 사용자 계정·보안 관리
- Storage 모듈로 판결문 PDF 업로드 및 관리

---

## 4. 서비스 개요 (Service Overview)

1. 판결문 업로드 (Supabase Storage)
2. 자동 파싱 및 구조화 (Edge Functions)
3. 집행 실익 점수 및 절차 안내
4. 맞춤형 집행 가이드 제공
5. 사용자 참여형 데이터 축적 → 알고리즘 고도화

---

## 5. MVP 범위 (Initial MVP)

- 판결문 PDF 업로드 및 주요 항목 추출
- 집행 실익 점수 산출 및 절차 안내
- 체크리스트 기반 진행 관리
- 기본 집행 서류 자동 생성
- 초기 데이터 50건 확보 → 100건 → 300건 단계별 축적

---

## 6. 기술 구조 (Draft Architecture)

- **Frontend**: React / Next.js
- **Backend**: Supabase Edge Functions (Python/Node.js)
- **Database**: Supabase PostgreSQL
- **Auth**: Supabase Auth (JWT 기반)
- **Storage**: Supabase Storage (판결문 PDF 관리)
- **Infra**: Supabase Cloud (서버리스, 확장성 내장)

---

## 7. 성장 전략 (Scale-up)

- ’26: MVP 출시, 초기 데이터 확보
- ’27: 알고리즘 고도화, 정확도 80% 이상 → 유료 리포트 제공
- 이후: 데이터 API 판매 및 SaaS 확장

---

## 8. 팀 구성 (Team)

- 대표자: 20년 IT/AI 경력 시스템 아키텍트
- 외부 파트너:
  · 서울시 동네변호사 (법률 로직 검증)
  · 웹 보안 전문가 (취약점 점검·비식별화)
  · AI 전문기관 (알고리즘 고도화)

---

## 9. Contact

- 프로젝트 제안자: 양지현
- 문의: (별도 전달)

---

> “Supabase 기반으로 빠르게 MVP를 구현하고,
> 데이터가 쌓일수록 집행 실익 분석 정확도를 높입니다.”
