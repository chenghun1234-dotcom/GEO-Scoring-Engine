export const getUI = () => `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GEO Scoring Engine v2.0 | AI Trust Analytics</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&family=Inter:wght@400;600&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg: #030303;
            --accent: #00f2ff;
            --accent-glow: rgba(0, 242, 255, 0.3);
            --hpi: #ff007a;
            --hpi-glow: rgba(255, 0, 122, 0.3);
            --card-bg: rgba(255, 255, 255, 0.03);
            --border: rgba(255, 255, 255, 0.08);
            --text-main: #ffffff;
            --text-dim: #999999;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            background: var(--bg);
            color: var(--text-main);
            font-family: 'Inter', sans-serif;
            min-height: 100vh;
            padding: 40px 20px;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            animation: fadeIn 0.8s ease-out;
        }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        header { text-align: center; margin-bottom: 60px; }
        h1 {
            font-family: 'Outfit', sans-serif;
            font-size: 3rem;
            font-weight: 800;
            background: linear-gradient(to right, #fff, var(--accent));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            letter-spacing: -1.5px;
        }

        .mode-toggle {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-bottom: 30px;
        }

        .mode-btn {
            padding: 10px 20px;
            background: var(--card-bg);
            border: 1px solid var(--border);
            border-radius: 30px;
            color: var(--text-dim);
            cursor: pointer;
            transition: 0.3s;
        }

        .mode-btn.active {
            background: var(--accent);
            color: #000;
            border-color: var(--accent);
            font-weight: 600;
        }

        .main-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin-bottom: 40px;
        }

        .input-panel {
            background: var(--card-bg);
            border: 1px solid var(--border);
            border-radius: 24px;
            padding: 30px;
            backdrop-filter: blur(10px);
        }

        textarea {
            width: 100%;
            height: 200px;
            background: rgba(0,0,0,0.4);
            border: 1px solid var(--border);
            border-radius: 16px;
            padding: 20px;
            color: #fff;
            font-size: 1rem;
            resize: none;
            outline: none;
            transition: 0.3s;
        }

        textarea:focus { border-color: var(--accent); box-shadow: 0 0 20px var(--accent-glow); }

        .analyze-btn {
            width: 100%;
            margin-top: 20px;
            padding: 20px;
            background: var(--accent);
            border: none;
            border-radius: 12px;
            color: #000;
            font-family: 'Outfit', sans-serif;
            font-weight: 800;
            font-size: 1.1rem;
            cursor: pointer;
            text-transform: uppercase;
        }

        /* Results Display */
        .results-container { display: none; margin-top: 40px; }

        .score-hero {
            display: flex;
            justify-content: space-around;
            align-items: center;
            background: rgba(255,255,255,0.02);
            border: 1px solid var(--border);
            border-radius: 30px;
            padding: 50px;
            margin-bottom: 40px;
            text-align: center;
        }

        .big-score {
            font-family: 'Outfit', sans-serif;
        }

        .big-score .val { font-size: 5rem; font-weight: 800; display: block; line-height: 1; }
        .big-score .label { font-size: 0.9rem; color: var(--text-dim); text-transform: uppercase; letter-spacing: 2px; }

        .geo-color { color: var(--accent); text-shadow: 0 0 30px var(--accent-glow); }
        .hpi-color { color: var(--hpi); text-shadow: 0 0 30px var(--hpi-glow); }

        .verdict-banner {
            font-size: 1.4rem;
            font-weight: 600;
            margin-top: 20px;
            padding: 15px;
            border-radius: 12px;
            background: rgba(255,255,255,0.05);
        }

        .details-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
        }

        .card {
            background: var(--card-bg);
            border: 1px solid var(--border);
            border-radius: 20px;
            padding: 25px;
        }

        .card-title { font-size: 0.85rem; color: var(--text-dim); margin-bottom: 15px; text-transform: uppercase; }
        .card-val { font-size: 2rem; font-weight: 700; color: var(--accent); }

        .entities-list { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
        .entity-tag {
            background: rgba(0, 242, 255, 0.1);
            border: 1px solid var(--accent);
            color: var(--accent);
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 0.85rem;
        }

        .recommendations {
            margin-top: 40px;
            background: rgba(255, 240, 0, 0.05);
            border-left: 5px solid #fff000;
            padding: 30px;
            border-radius: 0 20px 20px 0;
        }

        .rec-item { margin-bottom: 10px; display: flex; align-items: flex-start; gap: 10px; }
        .rec-item::before { content: "→"; color: #fff000; font-weight: bold; }

        .loader { display: none; text-align: center; padding: 40px; }
        .spinner {
            width: 50px;
            height: 50px;
            border: 5px solid rgba(255,255,255,0.1);
            border-top-color: var(--accent);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
        }
        @keyframes spin { 100% { transform: rotate(360deg); } }

        @media (max-width: 900px) {
            .main-grid { grid-template-columns: 1fr; }
            h1 { font-size: 2rem; }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>GEO Scoring Engine <span style="font-weight: 300; opacity: 0.6;">v2.0</span></h1>
            <p style="color: var(--text-dim); margin-top: 10px;">AI Hallucination 방지 지수 및 시맨틱 엔티티 분석</p>
        </header>

        <div class="mode-toggle">
            <button class="mode-btn active" id="singleBtn" onclick="setMode('single')">단일 분석</button>
            <button class="mode-btn" id="compareBtn" onclick="setMode('compare')">경쟁사 비교 (Benchmarking)</button>
        </div>

        <div class="main-grid" id="inputGrid">
            <div class="input-panel" id="panelA">
                <h3 style="margin-bottom: 15px; font-family: 'Outfit';">My Content</h3>
                <textarea id="inputA" placeholder="내 컨텐츠를 입력하세요..."></textarea>
                <button class="analyze-btn" onclick="analyze('A')">내 컨텐츠 분석</button>
            </div>
            <div class="input-panel" id="panelB" style="opacity: 0.3; pointer-events: none;">
                <h3 style="margin-bottom: 15px; font-family: 'Outfit';">Competitor</h3>
                <textarea id="inputB" placeholder="경쟁사 컨텐츠를 입력하세요..."></textarea>
                <button class="analyze-btn" style="background: #fff; color: #000;" onclick="analyze('B')">경쟁사 분석</button>
            </div>
        </div>

        <div class="loader" id="mainLoader">
            <div class="spinner"></div>
            <p>AI Trust Signals 추출 중...</p>
        </div>

        <div class="results-container" id="resultsArea">
            <div class="score-hero">
                <div class="big-score">
                    <span class="label">GEO Score</span>
                    <span class="val geo-color" id="res_geo">0</span>
                </div>
                <div style="width: 2px; height: 100px; background: var(--border);"></div>
                <div class="big-score">
                    <span class="label">Hallucination Prevention</span>
                    <span class="val hpi-color" id="res_hpi">0%</span>
                </div>
                <div style="text-align: left; max-width: 300px;">
                    <div class="verdict-banner" id="res_verdict">Verdict</div>
                    <p style="color: var(--text-dim); font-size: 0.9rem; margin-top: 10px;" id="res_comment">AI가 이 정보를 얼마나 신뢰하고 환각 없이 인용할 수 있는지 측정합니다.</p>
                </div>
            </div>

            <div class="details-grid">
                <div class="card">
                    <div class="card-title">통계 및 데이터 밀도</div>
                    <div class="card-val" id="res_s">0%</div>
                    <p style="font-size: 0.8rem; color: var(--text-dim); margin-top: 5px;">숫자, 퍼센트, 날짜 등 객관적 증거 포함도</p>
                </div>
                <div class="card">
                    <div class="card-title">권위 도메인 및 인용</div>
                    <div class="card-val" id="res_e">0%</div>
                    <p style="font-size: 0.8rem; color: var(--text-dim); margin-top: 5px;">.gov, .edu 링크 및 전문가 인용 마커</p>
                </div>
                <div class="card">
                    <div class="card-title">핵심 엔티티 (Semantic)</div>
                    <div class="entities-list" id="res_entities">
                        <!-- Entities will appear here -->
                    </div>
                </div>
                <div class="card">
                    <div class="card-title">정보 압축률</div>
                    <div class="card-val" id="res_r">0%</div>
                    <p style="font-size: 0.8rem; color: var(--text-dim); margin-top: 5px;">문장 내 핵심 정보 단어의 비중</p>
                </div>
            </div>

            <div class="recommendations" id="res_recs_area">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h3 style="font-family: 'Outfit'; color: #fff000;">Actionable Advice for AI SEO</h3>
                    <button class="mode-btn" style="background: #fff000; color: #000; border: none; font-weight: 800;" id="aiImproveBtn" onclick="improveWithAI()">AI로 즉시 최적화하기 (Pro)</button>
                </div>
                <div id="res_recs">
                    <!-- Recs will appear here -->
                </div>
            </div>

            <!-- AI Optimized Modal/Area -->
            <div id="aiOptimizedArea" style="display: none; margin-top: 30px; background: rgba(0,242,255,0.05); border: 1px dashed var(--accent); border-radius: 20px; padding: 30px;">
                <h3 style="margin-bottom: 15px; color: var(--accent);">AI Optimized Content</h3>
                <textarea id="improvedText" style="height: 250px; background: #000; border-color: var(--accent);" readonly></textarea>
                <div style="margin-top: 15px; display: flex; gap: 10px;">
                    <button class="mode-btn" onclick="copyToClipboard()">클립보드 복사</button>
                    <button class="mode-btn" onclick="document.getElementById('aiOptimizedArea').style.display='none'">닫기</button>
                </div>
            </div>
        </div>
    </div>

    <script>
        let currentMode = 'single';
        let currentAnalysis = null;

        function setMode(mode) {
            currentMode = mode;
            document.getElementById('singleBtn').classList.toggle('active', mode === 'single');
            document.getElementById('compareBtn').classList.toggle('active', mode === 'compare');
            
            const panelB = document.getElementById('panelB');
            if(mode === 'compare') {
                panelB.style.opacity = '1';
                panelB.style.pointerEvents = 'auto';
            } else {
                panelB.style.opacity = '0.3';
                panelB.style.pointerEvents = 'none';
            }
        }

        async function analyze(target) {
            const text = document.getElementById('input' + target).value;
            if(!text) return alert('내용을 입력하세요.');

            const loader = document.getElementById('mainLoader');
            const results = document.getElementById('resultsArea');
            
            loader.style.display = 'block';
            results.style.display = 'none';

            try {
                const response = await fetch('/api/analyze', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ text })
                });
                
                const data = await response.json();
                currentAnalysis = { text, recommendations: data.recommendations };
                displayResults(data);
                
                loader.style.display = 'none';
                results.style.display = 'block';
                results.scrollIntoView({ behavior: 'smooth' });
            } catch (e) {
                alert('분석 중 오류가 발생했습니다.');
                loader.style.display = 'none';
            }
        }

        async function improveWithAI() {
            if(!currentAnalysis) return;
            const btn = document.getElementById('aiImproveBtn');
            btn.innerText = '최적화 중...';
            btn.disabled = true;

            try {
                const response = await fetch('/api/improve', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(currentAnalysis)
                });
                const data = await response.json();
                
                document.getElementById('improvedText').value = data.improved;
                document.getElementById('aiOptimizedArea').style.display = 'block';
                document.getElementById('aiOptimizedArea').scrollIntoView({ behavior: 'smooth' });
            } catch (e) {
                alert('AI 최적화 중 오류가 발생했습니다.');
            } finally {
                btn.innerText = 'AI로 즉시 최적화하기 (Pro)';
                btn.disabled = false;
            }
        }

        function copyToClipboard() {
            const text = document.getElementById('improvedText');
            text.select();
            document.execCommand('copy');
            alert('클립보드에 복사되었습니다.');
        }

        function displayResults(data) {
            document.getElementById('res_geo').innerText = data.geo_score;
            document.getElementById('res_hpi').innerText = data.hpi_score + '%';
            document.getElementById('res_verdict').innerText = data.verdict;
            document.getElementById('res_s').innerText = data.analysis.data_authority.score + '%';
            document.getElementById('res_e').innerText = data.analysis.citation_structure.score + '%';
            document.getElementById('res_r').innerText = data.analysis.information_density.score + '%';

            // Entities
            const entityArea = document.getElementById('res_entities');
            entityArea.innerHTML = '';
            data.analysis.information_density.top_entities.forEach(ent => {
                const span = document.createElement('span');
                span.className = 'entity-tag';
                span.innerText = ent.name + ' (' + ent.count + ')';
                entityArea.appendChild(span);
            });

            // Recommendations
            const recArea = document.getElementById('res_recs');
            recArea.innerHTML = '';
            data.recommendations.forEach(rec => {
                const div = document.createElement('div');
                div.className = 'rec-item';
                div.innerText = rec;
                recArea.appendChild(div);
            });
        }
    </script>
</body>
</html>
`;
