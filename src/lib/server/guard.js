const WINDOW_MS = 60_000;
const MAX_TRACKED = 5_000;
const buckets = new Map();

export function clientAddress(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return request.headers.get("x-real-ip") || forwarded?.split(",")[0].trim() || "unknown";
}

export function isSameOrigin(request) {
  if (request.headers.get("sec-fetch-site") === "same-origin") return true;
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function prune(now) {
  for (const [key, entry] of buckets) {
    if (now - entry.start > WINDOW_MS) buckets.delete(key);
  }
}

export function withinLimit(key, limit) {
  const now = Date.now();
  const entry = buckets.get(key);
  if (!entry || now - entry.start > WINDOW_MS) {
    if (buckets.size >= MAX_TRACKED) prune(now);
    buckets.set(key, { start: now, count: 1 });
    return true;
  }
  entry.count += 1;
  return entry.count <= limit;
}
