import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server";
import { NextApiResponseWithSocket } from "./lib/io";

import type { NextApiRequest, NextApiResponse } from 'next'
import { Server } from 'socket.io'

import type { Server as HTTPServer } from 'http'
import type { Socket as NetSocket } from 'net'
import type { Server as IOServer } from 'socket.io'

export default withAuth(async function middleware(req, res:any) {
  const token = await getToken({ req });
  // if token exists, !!token will be true
  const isAuthenticated = !!token;

  if(["/lobby"].includes(req.nextUrl.pathname)){
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  }


  if (["/","/signin","/signup"].includes(req.nextUrl.pathname)) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/lobby", req.url));
    }
  }

},
{
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async authorized({req, token}) {
      return true
    }
  }
});

export const config = { matcher: ["/admin", "/lobby", "/signin","/","/signup"] }