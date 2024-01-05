import { NextRequest, NextResponse } from 'next/server';

import { createUserHelper } from '@/helpers/auth/create-user-helper/create-user-helper';

export async function POST(req: NextRequest) {
  if (!req) return;

  const data = await req.json();

  const res = await createUserHelper(data);

  return NextResponse.json({ res });
}
