// Read-only connectivity checks. Never print credentials or user records.
import process from 'node:process';
try { process.loadEnvFile('.env.local'); } catch { /* CI can provide environment variables directly. */ }
const base = process.env.EXPO_PUBLIC_SUPABASE_URL;
const key = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
if (!base || !key) {
  process.stdout.write('Supabase public configuration is missing.\n');
  process.exitCode = 1;
} else {
  const checks = [
    ['/auth/v1/health', 'Authentication health'],
    ['/auth/v1/settings', 'Authentication settings'],
    ['/rest/v1/properties?select=id&limit=0', 'Properties table'],
    ['/rest/v1/architect_profiles?select=id&limit=0', 'Architect profiles table'],
  ];
  for (const [path, label] of checks) {
    try {
      const response = await fetch(new URL(path, base), {
        headers: { apikey: key }, signal: AbortSignal.timeout(15000),
      });
      process.stdout.write(`${label}: HTTP ${response.status}\n`);
      const data = await response.json();
      if (!response.ok) {
        if (data.code === 'PGRST205') process.stdout.write('Database API reachable; required table is missing from the exposed schema.\n');
        process.exitCode = 1; continue;
      }
      if (path.endsWith('/settings')) {
        process.stdout.write(`Google enabled: ${data.external?.google === true}\nEmail enabled: ${data.external?.email === true}\nSignups disabled: ${data.disable_signup === true}\nEmail auto-confirm: ${data.mailer_autoconfirm === true}\n`);
      }
    } catch {
      process.stdout.write(`${label}: connection failed or response unavailable\n`);
      process.exitCode = 1;
    }
  }
}
