import { cookies } from 'next/headers';
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from './admin-session';

/**
 * Throws unless the current request carries a valid admin session.
 *
 * Server actions are plain POST endpoints that can be called without loading
 * the page that uses them, so the /admin page gate in proxy.ts is not enough
 * on its own for actions that act with GITHUB_TOKEN.
 */
export async function assertAdmin(): Promise<void> {
  const token = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;
  if (!(await verifyAdminSessionToken(token))) {
    throw new Error('Unauthorized');
  }
}
