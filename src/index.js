import { getUI } from './ui.js';
import { analyzeContent } from './analyzer.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Serve Dashboard
    if (url.pathname === '/' || url.pathname === '/index.html') {
      return new Response(getUI(), {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

    // API: Analyze Text
    if (url.pathname === '/api/analyze' && request.method === 'POST') {
      try {
        const body = await request.json();
        const { text, url: targetUrl } = body;

        if (!text && !targetUrl) {
          return new Response(JSON.stringify({ error: 'Text or URL is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        let contentToAnalyze = text;
        let metadata = { hasJsonLd: false, jsonLdType: "None" };

        // If URL is provided, fetch and extract using HTMLRewriter
        if (targetUrl) {
            const response = await fetch(targetUrl);
            let extractedText = "";
            
            const rewriter = new HTMLRewriter()
                .on('script[type="application/ld+json"]', {
                    text(text) {
                        if (text.content.trim()) {
                            metadata.hasJsonLd = true;
                            const match = text.content.match(/"@type"\s*:\s*"([^"]+)"/);
                            if (match) metadata.jsonLdType = match[1];
                        }
                    }
                })
                .on('p, h1, h2, h3, li', {
                    text(text) {
                        extractedText += text.content + " ";
                    }
                });

            await rewriter.transform(response).text();
            contentToAnalyze = extractedText.trim();
        }

        const result = analyzeContent(contentToAnalyze, metadata);
        
        return new Response(JSON.stringify({
            ...result,
            url: targetUrl || "Direct Text Input"
        }), {
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*' 
          },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    // Handle CORS Preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    return new Response('Not Found', { status: 404 });
  },
};
