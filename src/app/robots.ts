import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://conagentes.com";

export default function robots(): MetadataRoute.Robots {
  // Explicitly welcome the AI answer-engine crawlers (training + live retrieval)
  // so ChatGPT, Claude, Gemini, Perplexity, Copilot, Apple & Meta AI can ground
  // their answers on conagentes. Keeping /api, /dashboard, /login out of scope.
  const aiCrawlers = [
    "GPTBot", // OpenAI training
    "OAI-SearchBot", // ChatGPT Search / SearchGPT
    "ChatGPT-User", // ChatGPT browsing on behalf of a user
    "ClaudeBot", // Anthropic training
    "Claude-Web", // Claude live browsing
    "Claude-SearchBot", // Claude search retrieval
    "anthropic-ai",
    "PerplexityBot", // Perplexity index
    "Perplexity-User", // Perplexity live fetch
    "Google-Extended", // Gemini / Vertex grounding
    "Applebot-Extended", // Apple Intelligence
    "Amazonbot",
    "cohere-ai",
    "meta-externalagent", // Meta AI
    "Bytespider", // Doubao / TikTok
    "DuckAssistBot",
    "YouBot",
    "CCBot", // Common Crawl (feeds many models)
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard/", "/login/"],
      },
      {
        userAgent: aiCrawlers,
        allow: "/",
        disallow: ["/api/", "/dashboard/", "/login/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
