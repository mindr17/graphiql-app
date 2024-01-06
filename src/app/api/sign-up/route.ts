import { NextRequest, NextResponse } from 'next/server';

import { signUp } from '@/helpers/auth/create-user/sign-up';
import { UserTemplate } from '@/helpers/auth/types';

export async function POST(req: NextRequest) {
  if (!req) return;

  const formDataUser: UserTemplate = await req.json();

  const isSignedUp: boolean = await signUp(formDataUser);

  return NextResponse.json({ isSignedUp });
}
