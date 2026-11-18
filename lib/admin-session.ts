/**
 * Signed admin session token.
 *
 * The admin cookie used to be the literal string "true", so anyone who read
 * this public repo could set it by hand and skip the login. The token now
 * carries an expiry and an HMAC-SHA256 signature, so only a server that knows
 * the secret can mint one.
 *
 * Web Crypto (not node:crypto) because proxy.ts and the route handlers both
 * import this module.
 */

export const ADMIN_SESSION_COOKIE = 'admin-session';
export const ADMIN_SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

const encoder = new TextEncoder();

function getSecret(): string | null {
  // ADMIN_SESSION_SECRET is preferred. Falling back to the admin password keeps
  // the existing deployment working without new config, and means changing the
  // password also invalidates every session signed with the old one.
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || null;
}

function getKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(value: string): Uint8Array | null {
  try {
    const binary = atob(value.replace(/-/g, '+').replace(/_/g, '/'));
    return Uint8Array.from(binary, (char) => char.charCodeAt(0));
  } catch {
    return null;
  }
}

/** Returns a new signed token, or null when no secret is configured. */
export async function createAdminSessionToken(): Promise<string | null> {
  const secret = getSecret();
  if (!secret) return null;

  const expiresAt = Date.now() + ADMIN_SESSION_MAX_AGE_SECONDS * 1000;
  const nonce = toBase64Url(crypto.getRandomValues(new Uint8Array(16)));
  const payload = `${expiresAt}.${nonce}`;
  const signature = await crypto.subtle.sign('HMAC', await getKey(secret), encoder.encode(payload));

  return `${payload}.${toBase64Url(new Uint8Array(signature))}`;
}

/** True only for an unexpired token signed with the current secret. */
export async function verifyAdminSessionToken(token: string | undefined): Promise<boolean> {
  const secret = getSecret();
  if (!secret || !token) return false;

  const parts = token.split('.');
  if (parts.length !== 3) return false;
  const [expiresAt, nonce, signature] = parts;

  if (!/^\d+$/.test(expiresAt) || Number(expiresAt) < Date.now()) return false;

  const signatureBytes = fromBase64Url(signature);
  if (!signatureBytes) return false;

  // subtle.verify compares in constant time, unlike comparing two strings.
  return crypto.subtle.verify(
    'HMAC',
    await getKey(secret),
    signatureBytes,
    encoder.encode(`${expiresAt}.${nonce}`)
  );
}
