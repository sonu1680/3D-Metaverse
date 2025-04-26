import { NextRequest, NextResponse } from "next/server";
import { decode } from "next-auth/jwt";

export default async function middleware(request: NextRequest) {
//   const token =
//     request.cookies.get("next-auth.session-token")?.value ||
//     request.cookies.get("__Secure-next-auth.session-token")?.value;

//   if (!token && request.nextUrl.pathname.startsWith("/game")) {
//     return NextResponse.redirect(new URL("/auth", request.url));
//   }
//   if (!token && request.nextUrl.pathname.startsWith("/room")) {
//     return NextResponse.redirect(new URL("/auth", request.url));
//   }
//   const decodedToken = token
//     ? await decode({
//         token: token,
//         secret: process.env.NEXTAUTH_SECRET || "",
//       })
//     : null;

//   const requestHeaders = new Headers(request.headers);
//   if (decodedToken?.userId) {
//     requestHeaders.set("userId", decodedToken.userId as string);
//   }

//   const response = NextResponse.next({
//     request: {
//       headers: requestHeaders,
//     },
//   });

//   if (decodedToken?.userId) {
//     response.headers.set("userId", decodedToken.userId as string);
//   }

//   return response;
// }

// export const config = {
//   matcher: ["/:path*"],
};
