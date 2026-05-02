# 🚀 GEO Scoring Engine v2.0: AI Trust Analytics

LLM(대규모 언어 모델)은 단순 키워드가 아닌 **'신뢰할 수 있는 데이터 구조'**와 **'검증 가능한 정보의 밀도'**를 우선시합니다. GEO Scoring Engine은 Cloudflare Workers를 활용하여 초경량으로 구현된 컨텐츠 신뢰도 분석 도구입니다.

## 核心 (Core) GEO DNA v2.0 분석 지표
AI가 정보를 인용할 때 가산점을 주는 요소들을 수치화합니다:
- **AI 환각 방지 지수 (Hallucination Prevention Index)**: 데이터 정밀도를 측정하여 AI의 오답률을 낮추는 지표.
- **시맨틱 엔티티 분석 (Entity Extraction)**: 핵심 키워드의 빈도와 일관성 분석.
- **권위 도메인 검증 (Authority Check)**: .gov, .edu 등 공신력 있는 외부 링크 분석.
- **실행 가이드 (Actionable Advice)**: 점수를 높이기 위한 즉각적인 개선 제안 제공.
- **경쟁사 비교 분석 (Benchmarking)**: 내 컨텐츠와 경쟁사의 GEO 점수 실시간 비교.

## 🛠 기술 아키텍처
- **Runtime**: Cloudflare Workers (Edge Computing)
- **Engine**: `HTMLRewriter` 기반 고속 메타데이터 및 텍스트 추출.
- **Logic**: v2.0 강화된 정규식 및 시맨틱 주파수 분석 엔진.
- **UI**: Benchmarking 모드가 포함된 프리미엄 Glassmorphism 대시보드.

## 💰 RapidAPI 수익화 전략
- **Free Tier**: 5회/일 (개발자 테스트용)
- **Pro Tier ($29/mo)**: 500회/일, 마케팅 대행사용 상세 분석 및 AI 개선 가이드.
- **Ultra Tier ($99/mo)**: 무제한, 경쟁사 비교 및 PDF 리포트 기능.

## 🚀 시작하기
```bash
npm install
npm run dev
```

---
*2026년 현재, 마케터들은 단순 키워드 순위보다 **"AI 답변 박스 점유율"**에 훨씬 더 큰 예산을 쓰고 있습니다. GEO Scoring Engine으로 시장을 선점하세요.*
