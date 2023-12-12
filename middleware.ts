import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const BASE_URL = 'https://www.inforum24.com';

export function middleware(request: NextRequest) {
  if (request.nextUrl.host.startsWith('inforum.me')) {
    return NextResponse.redirect(new URL(request.nextUrl.pathname, BASE_URL));
  }
  console.log('hello');
}
