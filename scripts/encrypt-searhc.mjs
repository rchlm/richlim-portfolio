/**
 * Encrypts searhc/source-content.html with AES-GCM (PBKDF2-derived key)
 * and writes the payload into searhc/index.html.
 *
 * Usage:
 *   SEARHC_PASS=<password> node scripts/encrypt-searhc.mjs
 *
 * Requires Node.js 18+ (webcrypto built-in, no flag needed).
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { webcrypto } from 'node:crypto';

const { subtle } = webcrypto;

const password = process.env.SEARHC_PASS;
if (!password) {
  console.error('Error: SEARHC_PASS environment variable is required.');
  process.exit(1);
}

const sourceHtml = readFileSync(new URL('../searhc/source-content.html', import.meta.url), 'utf8');
let   pageHtml   = readFileSync(new URL('../searhc/index.html',           import.meta.url), 'utf8');

const enc  = new TextEncoder();
const salt = webcrypto.getRandomValues(new Uint8Array(16));
const iv   = webcrypto.getRandomValues(new Uint8Array(12));

const keyMaterial = await subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']);
const key = await subtle.deriveKey(
  { name: 'PBKDF2', hash: 'SHA-256', salt, iterations: 200000 },
  keyMaterial,
  { name: 'AES-GCM', length: 256 },
  false,
  ['encrypt']
);

const cipherBuf = await subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(sourceHtml));

const toB64 = buf => Buffer.from(buf).toString('base64');

const payload = JSON.stringify({
  s: toB64(salt),
  i: toB64(iv),
  d: toB64(new Uint8Array(cipherBuf))
});

// Replace the content of <script id="cs-payload" type="application/json">
const updated = pageHtml.replace(
  /(<script\s+id="cs-payload"[^>]*>)([\s\S]*?)(<\/script>)/,
  '$1' + payload + '$3'
);

if (updated === pageHtml) {
  console.error('Error: Could not find <script id="cs-payload"> in searhc/index.html.');
  process.exit(1);
}

writeFileSync(new URL('../searhc/index.html', import.meta.url), updated);
console.log('Done. Encrypted payload written to searhc/index.html.');
