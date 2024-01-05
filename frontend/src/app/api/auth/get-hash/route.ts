import { NextRequest, NextResponse } from 'next/server';

import { getPasswordHash } from '@/helpers/auth/get-password-hash';

export async function POST(req: NextRequest) {
  if (!req) return;

  const data = await req.json();

  const { password } = data;
  console.log('password: ', password);

  const passwordHash = await getPasswordHash(password);
  console.log('passwordHash: ', passwordHash);

  return NextResponse.json({ passwordHash });
}
