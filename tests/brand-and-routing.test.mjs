import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('brand constant is set to Ilam Mora', async () => {
  const content = await readFile(new URL('../constants/brand.ts', import.meta.url), 'utf8');
  assert.match(content, /name:\s*['"]Ilam Mora['"]/);
});

test('app.json has Ilam Mora as name', async () => {
  const raw = await readFile(new URL('../app.json', import.meta.url), 'utf8');
  const parsed = JSON.parse(raw);
  assert.equal(parsed.expo.name, 'Ilam Mora');
});

test('app layout does not redirect guests to login for studio tools', async () => {
  const content = await readFile(new URL('../app/(app)/_layout.tsx', import.meta.url), 'utf8');
  assert.doesNotMatch(content, /!session && !publicHome/);
});

test('screens do not have residual BuildVerse or BuildWise names', async () => {
  const files = [
    '../app/(app)/(tabs)/dashboard.tsx',
    '../app/(auth)/login.tsx',
    '../app/(auth)/signup-iconic.tsx',
    '../app/(auth)/user-type.tsx',
    '../app/(app)/marketplace/design.tsx',
    '../app/(app)/marketplace/products.tsx',
    '../components/discover-header.tsx',
  ];
  for (const file of files) {
    const text = await readFile(new URL(file, import.meta.url), 'utf8');
    assert.doesNotMatch(text, /BuildVerse/i, `File ${file} contains BuildVerse`);
    assert.doesNotMatch(text, /BuildWise/i, `File ${file} contains BuildWise`);
  }
});

test('google login is removed from auth screens', async () => {
  const loginText = await readFile(new URL('../app/(auth)/login.tsx', import.meta.url), 'utf8');
  assert.doesNotMatch(loginText, /continue with google/i);
  assert.doesNotMatch(loginText, /googleButton/);

  const signupText = await readFile(new URL('../app/(auth)/signup-iconic.tsx', import.meta.url), 'utf8');
  assert.doesNotMatch(signupText, /sign up with google/i);
  assert.doesNotMatch(signupText, /googleButton/);

  const authFormText = await readFile(new URL('../components/auth-form.tsx', import.meta.url), 'utf8');
  assert.doesNotMatch(authFormText, /continue with google/i);
});

test('client and homeowner dashboard includes link to projects for architects', async () => {
  const dashText = await readFile(new URL('../app/(app)/(tabs)/dashboard.tsx', import.meta.url), 'utf8');
  assert.match(dashText, /Projects for Architects/);
  assert.match(dashText, /\/\(app\)\/\(tabs\)\/projects/);
});


