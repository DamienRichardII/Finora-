import "server-only";

/**
 * Limiteur de requêtes en mémoire (fenêtre glissante simple).
 * Suffisant pour une instance unique ; à remplacer par Upstash/Redis si le
 * site tourne sur plusieurs instances (voir SECURITY.md).
 */
const hits = new Map<string, number[]>();

export function rateLimit(key: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) return false;
  recent.push(now);
  hits.set(key, recent);
  return true;
}
