import { NextRequest, NextResponse } from 'next/server';

import { getPasswordHash } from '@/helpers/auth/get-password-hash';

export async function POST(req: NextRequest) {
  if (!req) return;

  const data = await req.json();

  const { password } = data;

  const passwordHash = await getPasswordHash(password);

  return NextResponse.json({ passwordHash });
}
