import { createHash, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE_SECONDS,
  createAdminSessionToken,
} from "@/lib/admin-session";

// Hashing both sides first gives equal-length buffers, which timingSafeEqual
// requires, and keeps the comparison time independent of the password length.
function passwordMatches(input: unknown, expected: string): boolean {
  if (typeof input !== "string") return false;
  const a = createHash("sha256").update(input).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

export async function POST(req: Request) {
  const expected = process.env.ADMIN_PASSWORD;
  const { password } = await req.json().catch(() => ({ password: undefined }));

  // Without this check an unset ADMIN_PASSWORD made `undefined === undefined`
  // true, so an empty request body logged in.
  if (!expected || !passwordMatches(password, expected)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = await createAdminSessionToken();
  if (!token) {
    return NextResponse.json({ error: "Session secret is not configured" }, { status: 500 });
  }

  (await cookies()).set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
  });

  return NextResponse.json({ success: true });
}
