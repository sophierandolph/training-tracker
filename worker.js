// Cloudflare Worker - Anthropic API Proxy
// Deploy: npx wrangler deploy worker.js --name training-coach
// Set secret: npx wrangler secret put ANTHROPIC_API_KEY

const ALLOWED_ORIGINS = [
  'https://sophierandolph.github.io',
  'http://localhost',
  'file://',
];

function isAllowedOrigin(request) {
  const origin = request.headers.get('Origin') || '';
  const referer = request.headers.get('Referer') || '';
  // Allow listed origins, local file access (no origin), and localhost for dev
  if (!origin && !referer) return true; // local file:// access sends no origin
  return ALLOWED_ORIGINS.some(allowed => origin.startsWith(allowed) || referer.startsWith(allowed));
}

function corsHeaders(request) {
  const origin = request.headers.get('Origin') || '*';
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export default {
  async fetch(request, env) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          ...corsHeaders(request),
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    // Origin check
    if (!isAllowedOrigin(request)) {
      return new Response('Forbidden', { status: 403 });
    }

    try {
      const { system, messages } = await request.json();

      // Basic validation: messages must be an array, system must be a string
      if (!Array.isArray(messages) || typeof system !== 'string') {
        return new Response(JSON.stringify({ error: 'Invalid request format' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders(request) },
        });
      }

      // Cap message count to prevent abuse
      const cappedMessages = messages.slice(-20);

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: env.MODEL_VERSION || 'claude-sonnet-4-5-20250929',
          max_tokens: 1024,
          system,
          messages: cappedMessages,
        }),
      });

      const data = await response.text();
      return new Response(data, {
        status: response.status,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders(request),
        },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: 'Internal server error' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders(request),
        },
      });
    }
  },
};
