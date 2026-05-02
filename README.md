# 🚀 GEO Scoring Engine: AI-Native SEO Analysis

LLM(대규모 언어 모델)은 단순 키워드가 아닌 **'신뢰할 수 있는 데이터 구조'**와 **'검증 가능한 정보의 밀도'**를 우선시합니다. GEO Scoring Engine은 Cloudflare Workers를 활용하여 초경량으로 구현된 컨텐츠 신뢰도 분석 도구입니다.

## 核心 (Core) GEO DNA 분석 지표
AI가 정보를 인용할 때 가산점을 주는 요소들을 수치화합니다:
- **통계적 증거 (Statistical Density)**: 숫자, %, 날짜 등 구체적 수치.
- **권위적 인용 (Expert Citation)**: 전문가 및 공신력 있는 기관의 인용 구조.
- **시맨틱 구조 (Structured Data)**: JSON-LD 등 기계 판독용 데이터 존재 여부.
- **정보 밀도 (Information Density)**: 핵심 엔티티의 압축률 및 가독성.

## 🛠 기술 아키텍처
- **Runtime**: Cloudflare Workers (Edge Computing)
- **Engine**: `HTMLRewriter` 기반 고속 메타데이터 및 텍스트 추출.
- **Logic**: 정규식 세트를 활용한 무거운 모델 없는 고속 스코어링.
- **UI**: Glassmorphism 디자인이 적용된 프리미엄 대시보드 내장.

## 💰 RapidAPI 수익화 전략
- **Free Tier**: 5회/일 (개발자 테스트용)
- **Pro Tier ($29/mo)**: 500회/일, 마케팅 대행사용 상세 분석.
- **Ultra Tier ($99/mo)**: 무제한, 경쟁사 URL 비교 분석 지원.

## 🚀 시작하기
```bash
npm install
npm run dev
```

---
*2026년 현재, 마케터들은 단순 키워드 순위보다 **"AI 답변 박스 점유율"**에 훨씬 더 큰 예산을 쓰고 있습니다. GEO Scoring Engine으로 시장을 선점하세요.*
