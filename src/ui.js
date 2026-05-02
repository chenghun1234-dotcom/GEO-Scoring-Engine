export const getUI = () => `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GEO Scoring Engine | AI-Native SEO Analysis</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&family=Inter:wght@400;600&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg: #050505;
            --accent: #00f2ff;
            --accent-glow: rgba(0, 242, 255, 0.3);
            --card-bg: rgba(255, 255, 255, 0.05);
            --border: rgba(255, 255, 255, 0.1);
            --text-main: #ffffff;
            --text-dim: #b0b0b0;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            background: var(--bg);
            color: var(--text-main);
            font-family: 'Inter', sans-serif;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow-x: hidden;
        }

        .background-blobs {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            overflow: hidden;
        }

        .blob {
            position: absolute;
            filter: blur(80px);
            opacity: 0.2;
            border-radius: 50%;
        }

        .blob-1 { width: 400px; height: 400px; background: #00f2ff; top: -100px; right: -100px; }
        .blob-2 { width: 300px; height: 300px; background: #7000ff; bottom: -50px; left: -50px; }

        .container {
            width: 90%;
            max-width: 900px;
            background: var(--card-bg);
            backdrop-filter: blur(20px);
            border: 1px solid var(--border);
            border-radius: 24px;
            padding: 40px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.5);
            animation: fadeIn 0.8s ease-out;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        header {
            text-align: center;
            margin-bottom: 40px;
        }

        h1 {
            font-family: 'Outfit', sans-serif;
            font-size: 2.5rem;
            font-weight: 800;
            background: linear-gradient(to right, #fff, #00f2ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            letter-spacing: -1px;
        }

        p.subtitle {
            color: var(--text-dim);
            margin-top: 10px;
            font-size: 1.1rem;
        }

        .input-group {
            position: relative;
            margin-bottom: 30px;
        }

        textarea {
            width: 100%;
            height: 150px;
            background: rgba(0,0,0,0.3);
            border: 1px solid var(--border);
            border-radius: 16px;
            padding: 20px;
            color: #fff;
            font-size: 1rem;
            resize: none;
            transition: all 0.3s ease;
            outline: none;
        }

        textarea:focus {
            border-color: var(--accent);
            box-shadow: 0 0 15px var(--accent-glow);
        }

        button {
            width: 100%;
            padding: 18px;
            background: var(--accent);
            border: none;
            border-radius: 12px;
            color: #000;
            font-family: 'Outfit', sans-serif;
            font-weight: 800;
            font-size: 1.1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 20px var(--accent-glow);
        }

        .results {
            margin-top: 40px;
            display: none;
        }

        .score-display {
            text-align: center;
            margin-bottom: 40px;
        }

        .score-circle {
            width: 150px;
            height: 150px;
            border: 4px solid var(--accent);
            border-radius: 50%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: 0 auto 20px;
            box-shadow: 0 0 30px var(--accent-glow);
        }

        .score-val {
            font-size: 3rem;
            font-weight: 800;
            font-family: 'Outfit', sans-serif;
        }

        .score-label {
            font-size: 0.8rem;
            color: var(--text-dim);
            text-transform: uppercase;
        }

        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
        }

        .metric-card {
            background: rgba(255,255,255,0.03);
            border: 1px solid var(--border);
            border-radius: 16px;
            padding: 20px;
            text-align: center;
        }

        .metric-title {
            font-size: 0.9rem;
            color: var(--text-dim);
            margin-bottom: 10px;
        }

        .metric-value {
            font-size: 1.5rem;
            font-weight: 600;
            color: var(--accent);
        }

        .verdict-box {
            margin-top: 30px;
            padding: 20px;
            background: rgba(0, 242, 255, 0.05);
            border-left: 4px solid var(--accent);
            border-radius: 0 12px 12px 0;
        }

        .verdict-title {
            font-weight: 800;
            margin-bottom: 5px;
            color: var(--accent);
        }

        .loading {
            display: none;
            text-align: center;
            margin: 20px 0;
        }

        .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid rgba(255,255,255,0.1);
            border-top: 4px solid var(--accent);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto;
        }

        @keyframes spin { 100% { transform: rotate(360deg); } }
    </style>
</head>
<body>
    <div class="background-blobs">
        <div class="blob blob-1"></div>
        <div class="blob blob-2"></div>
    </div>

    <div class="container">
        <header>
            <h1>GEO Scoring Engine</h1>
            <p class="subtitle">AI 답변 채택을 위한 데이터 구조 및 정보 밀도 분석</p>
        </header>

        <div class="input-area">
            <div class="input-group">
                <textarea id="contentInput" placeholder="분석할 텍스트나 기사 본문을 입력하세요..."></textarea>
            </div>
            <button onclick="analyze()">실시간 분석 시작</button>
        </div>

        <div class="loading" id="loader">
            <div class="spinner"></div>
            <p style="margin-top: 15px; color: var(--text-dim);">GEO DNA 추출 중...</p>
        </div>

        <div class="results" id="results">
            <div class="score-display">
                <div class="score-circle">
                    <span class="score-val" id="totalScore">0</span>
                    <span class="score-label">GEO Score</span>
                </div>
                <div class="verdict-box">
                    <p class="verdict-title">Final Verdict</p>
                    <p id="verdictText"></p>
                </div>
            </div>

            <div class="metrics-grid">
                <div class="metric-card">
                    <p class="metric-title">통계적 증거 (S)</p>
                    <p class="metric-value" id="sScore">0</p>
                </div>
                <div class="metric-card">
                    <p class="metric-title">권위적 인용 (E)</p>
                    <p class="metric-value" id="eScore">0</p>
                </div>
                <div class="metric-card">
                    <p class="metric-title">구조화 데이터 (J)</p>
                    <p class="metric-value" id="jScore">0</p>
                </div>
                <div class="metric-card">
                    <p class="metric-title">정보 밀도 (R)</p>
                    <p class="metric-value" id="rScore">0</p>
                </div>
            </div>
        </div>
    </div>

    <script>
        async function analyze() {
            const text = document.getElementById('contentInput').value;
            if(!text) return alert('텍스트를 입력해주세요.');

            const loader = document.getElementById('loader');
            const results = document.getElementById('results');
            
            loader.style.display = 'block';
            results.style.display = 'none';

            try {
                const response = await fetch('/api/analyze', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ text })
                });
                
                const data = await response.json();
                
                document.getElementById('totalScore').innerText = data.geo_score;
                document.getElementById('verdictText').innerText = data.verdict;
                document.getElementById('sScore').innerText = data.analysis.data_authority.score + '%';
                document.getElementById('eScore').innerText = data.analysis.citation_structure.score + '%';
                document.getElementById('jScore').innerText = data.analysis.structured_data.score + '%';
                document.getElementById('rScore').innerText = data.analysis.information_density.score + '%';

                loader.style.display = 'none';
                results.style.display = 'block';
            } catch (e) {
                alert('분석 중 오류가 발생했습니다.');
                loader.style.display = 'none';
            }
        }
    </script>
</body>
</html>
`;
