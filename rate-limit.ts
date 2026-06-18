const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 5;

export function rateLimit(key: string): {
  success: boolean;
  remaining: number;
  resetAt: Date;
} {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || entry.resetAt < now) {
    const resetAt = now + WINDOW_MS;
    rateLimitMap.set(key, { count: 1, resetAt });
    return { success: true, remaining: MAX_REQUESTS - 1, resetAt: new Date(resetAt) };
  }

  if (entry.count >= MAX_REQUESTS) {
    return { success: false, remaining: 0, resetAt: new Date(entry.resetAt) };
  }

  entry.count++;
  return {
    success: true,
    remaining: MAX_REQUESTS - entry.count,
    resetAt: new Date(entry.resetAt),
  };
}

// Clean up expired entries every 10 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of Array.from(rateLimitMap.entries())) {
      if (entry.resetAt < now) rateLimitMap.delete(key);
    }
  }, 10 * 60 * 1000);
}
