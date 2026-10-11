export function isPublicSupabaseConfiguration(url?: string, key?: string): boolean {
  if (!url || !key) return false;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:' || parsed.username || parsed.password || parsed.search || parsed.hash) return false;
    if (key.startsWith('sb_publishable_') && key.length > 20) return true;
    // Legacy JWT keys are supported only when explicitly scoped to anon.
    // This is a configuration guard, not signature verification; Supabase
    // verifies credentials and row-level policies on every real request.
    const parts = key.split('.');
    if (parts.length !== 3) return false;
    const encoded = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const claims = JSON.parse(atob(encoded.padEnd(Math.ceil(encoded.length / 4) * 4, '=')));
    return claims.role === 'anon';
  } catch { return false; }
}

export function validateCredentials(email: string, password: string, signupName?: string): string | null {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) || email.trim().length > 254) return 'Enter a valid email address.';
  if (!password) return 'Enter your password.';
  if (signupName !== undefined) {
    if (password.length < 12) return 'Use a password with at least 12 characters.';
    if (signupName.trim().length < 2 || signupName.trim().length > 100) return 'Enter your name (2–100 characters).';
  }
  return null;
}
