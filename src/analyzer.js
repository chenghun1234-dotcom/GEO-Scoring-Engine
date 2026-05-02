/**
 * GEO DNA Scoring Engine
 * Analyzes text for statistical density, expert citations, and information density.
 */

export function analyzeContent(text, metadata = {}) {
  const stats = {
    numerical: (text.match(/\b\d+(\.\d+)?\b/g) || []).length,
    percentage: (text.match(/\d+(\.\d+)?%/g) || []).length,
    dates: (text.match(/\b(19|20)\d{2}(년|s)?\b/g) || []).length,
    currencies: (text.match(/[\$€£¥₩]|(USD|KRW|EUR)/g) || []).length,
  };

  const citations = {
    quotes: (text.match(/(?:"|'|「|『)(.*?)(?:"|'|」|』)/g) || []).length,
    expertMarkers: (text.match(/(?:학술지|보고서|전문가|박사|연구원|명시|발표|따르면|의하면|분석했다|according to|reported|stated|claims|expert|study|research|professor|dr\.)/gi) || []).length,
  };

  // Entity Density (Simplified)
  const words = text.split(/\s+/).filter(w => w.length > 0);
  const totalWords = words.length;
  
  // Weights (W)
  const Ws = 0.35; // Stats
  const We = 0.25; // Expert Citations
  const Wj = 0.20; // JSON-LD (Metadata)
  const Wr = 0.20; // Readability/Density

  // Normalize Scores (0-100)
  const S_score = Math.min(100, (stats.numerical + stats.percentage * 5 + stats.dates * 10) * 2);
  const E_score = Math.min(100, (citations.quotes * 10 + citations.expertMarkers * 15));
  const J_score = metadata.hasJsonLd ? 100 : 0;
  
  // Density Score: Entity-like words (words > 4 chars) vs total
  const complexWords = words.filter(w => w.length > 4).length;
  const R_score = totalWords > 0 ? Math.min(100, (complexWords / totalWords) * 200) : 0;

  const finalScore = Math.round((Ws * S_score) + (We * E_score) + (Wj * J_score) + (Wr * R_score));

  let verdict = "Low Impact";
  if (finalScore >= 80) verdict = "High Potential (AI 답변 채택 가능성 매우 높음)";
  else if (finalScore >= 60) verdict = "Moderate (신뢰성 보완 필요)";
  else verdict = "Low Quality (데이터 밀도 부족)";

  return {
    geo_score: finalScore,
    analysis: {
      data_authority: {
        score: S_score,
        found_stats: {
          numerical: stats.numerical,
          percentage: stats.percentage,
          dates: stats.dates
        },
        comment: S_score > 70 ? "구체적인 수치가 풍부하여 AI 인용 확률이 높습니다." : "수치 데이터 보완이 필요합니다."
      },
      structured_data: {
        exists: metadata.hasJsonLd,
        type: metadata.jsonLdType || "Unknown",
        score: J_score
      },
      citation_structure: {
        score: E_score,
        detected_quotes: citations.quotes,
        recommendation: E_score < 50 ? "전문가 인터뷰나 외부 연구 결과 인용이 부족합니다." : "인용 구조가 잘 갖춰져 있습니다."
      },
      information_density: {
        score: R_score,
        word_count: totalWords,
        complexity: R_score > 50 ? "High" : "Low"
      }
    },
    verdict
  };
}
