import { NextRequest, NextResponse } from 'next/server';

import { createUserHelper } from '@/helpers/auth/create-user-helper';
import { getPasswordHash } from '@/helpers/auth/get-password-hash';

export async function POST(req: NextRequest) {
  if (!req) return;

  const data = await req.json();

  const { email, password } = data;

  const passwordHash = await getPasswordHash(password);

  const newUser = { email, password_hash: passwordHash };

  const res = await createUserHelper(newUser);

  return NextResponse.json({ res });
}
