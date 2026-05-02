/**
 * GEO DNA Scoring Engine v2.0
 * Enhanced with Entity Extraction, Authority Check, and Hallucination Prevention Index.
 */

export function analyzeContent(text, metadata = {}) {
  // 1. Statistical Density (S)
  const stats = {
    numerical: (text.match(/\b\d+(\.\d+)?\b/g) || []).length,
    percentage: (text.match(/\d+(\.\d+)?%/g) || []).length,
    dates: (text.match(/\b(19|20)\d{2}(년|s)?\b/g) || []).length,
    currencies: (text.match(/[\$€£¥₩]|(USD|KRW|EUR)/g) || []).length,
  };

  // 2. Expert Citations & Domain Authority (E)
  const citations = {
    quotes: (text.match(/(?:"|'|「|『)(.*?)(?:"|'|」|』)/g) || []).length,
    expertMarkers: (text.match(/(?:학술지|보고서|전문가|박사|연구원|명시|발표|따르면|의하면|분석했다|according to|reported|stated|claims|expert|study|research|professor|dr\.)/gi) || []).length,
    authorityDomains: (text.match(/\bhttps?:\/\/[^\s]+(\.gov|\.edu|\.org|wikipedia\.org)\b/gi) || []).length,
  };

  // 3. Entity Extraction (Semantic Frequency)
  const words = text.split(/[\s,.\(\)\[\]]+/).filter(w => w.length > 1);
  const totalWords = words.length;
  
  const entityFreq = {};
  words.forEach(w => {
    if (w.length > 2) { // Focus on meaningful terms
      entityFreq[w] = (entityFreq[w] || 0) + 1;
    }
  });
  
  const topEntities = Object.entries(entityFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }));

  // 4. Scoring Algorithm (W)
  const Ws = 0.30; // Stats
  const We = 0.30; // Expert/Domain
  const Wj = 0.15; // JSON-LD
  const Wr = 0.25; // Readability/Density

  const S_score = Math.min(100, (stats.numerical + stats.percentage * 5 + stats.dates * 10) * 2);
  const E_score = Math.min(100, (citations.quotes * 10 + citations.expertMarkers * 15 + citations.authorityDomains * 20));
  const J_score = metadata.hasJsonLd ? 100 : 0;
  
  const complexWords = words.filter(w => w.length > 4).length;
  const R_score = totalWords > 0 ? Math.min(100, (complexWords / totalWords) * 200) : 0;

  const finalScore = Math.round((Ws * S_score) + (We * E_score) + (Wj * J_score) + (Wr * R_score));

  // 5. Hallucination Prevention Index (HPI)
  // Higher score means less likely for AI to hallucinate based on this content
  const hpi = Math.round((S_score * 0.5) + (E_score * 0.4) + (J_score * 0.1));

  // 6. Actionable Advice
  const recommendations = [];
  if (S_score < 60) recommendations.push("구체적인 데이터(숫자, %)를 추가하여 정보의 객관성을 높이세요.");
  if (E_score < 50) recommendations.push("신뢰할 수 있는 외부 기관(.gov, .edu)이나 전문가의 의견을 인용하세요.");
  if (!metadata.hasJsonLd) recommendations.push("JSON-LD 구조화 데이터를 추가하여 AI의 기계적 이해를 도우세요.");
  if (R_score < 50) recommendations.push("불필요한 수식어를 줄이고 핵심 키워드 중심의 압축된 문장을 사용하세요.");

  let verdict = "Low Impact";
  if (finalScore >= 80) verdict = "High Potential (AI 답변 채택 가능성 매우 높음)";
  else if (finalScore >= 60) verdict = "Moderate (신뢰성 보완 필요)";
  else verdict = "Low Quality (데이터 밀도 부족)";

  return {
    geo_score: finalScore,
    hpi_score: hpi,
    analysis: {
      data_authority: {
        score: S_score,
        found_stats: stats,
        comment: S_score > 70 ? "수치 데이터가 풍부합니다." : "데이터 기반 논거가 부족합니다."
      },
      structured_data: {
        exists: metadata.hasJsonLd,
        type: metadata.jsonLdType || "None",
        score: J_score
      },
      citation_structure: {
        score: E_score,
        detected_quotes: citations.quotes,
        authority_links: citations.authorityDomains
      },
      information_density: {
        score: R_score,
        top_entities: topEntities
      }
    },
    recommendations,
    verdict
  };
}
