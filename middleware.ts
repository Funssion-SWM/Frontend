import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const BASE_URL = 'https://www.inforum24.com';

export function middleware(request: NextRequest) {
  const requestedHost = request.headers.get('X-Forwarded-Host');

  if (requestedHost && request.nextUrl.host.startsWith('inforum.me')) {
    const nextUrl = request.nextUrl.clone();

    const url = new URL(request.nextUrl.pathname, BASE_URL);

    const requestedProto = request.headers.get('X-Forwarded-Proto');
    const requestedPort = request.headers.get('X-Forwarded-Port');

    url.protocol = requestedProto || nextUrl.protocol;
    url.port = requestedPort || nextUrl.port;

    return NextResponse.redirect(url);
  }
}
