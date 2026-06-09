// IndexNow — instantly notify Bing & Yandex when content changes. Bing powers
// ChatGPT Search and Microsoft Copilot, so this is a GEO lever as much as an SEO
// one: new blog posts get discovered in minutes instead of waiting for a crawl.
// The key is a public, non-secret token; it must match the file served at
// /<key>.txt (public/a3f8c1e90b7d4625fe8a2c4b6d019e73.txt). (CON-025)

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://conagentes.com";
const INDEXNOW_KEY = "a3f8c1e90b7d4625fe8a2c4b6d019e73";

/**
 * Submit one or more canonical URLs to IndexNow. Fire-and-forget and fully
 * guarded — any failure is logged and swallowed so it can never break the
 * publish flow that calls it.
 */
export async function submitToIndexNow(urls: string[]): Promise<void> {
  if (urls.length === 0) return;

  let host: string;
  try {
    host = new URL(SITE_URL).host;
  } catch {
    return;
  }

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host,
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: urls,
      }),
    });
    if (!res.ok) {
      console.warn(`IndexNow submission returned ${res.status}`);
    }
  } catch (err) {
    console.warn("IndexNow submission failed:", err);
  }
}
