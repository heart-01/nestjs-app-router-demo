import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify, importJWK } from "jose";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  try {
    const parsedUrl = new URL(request.url);
    const pathname = parsedUrl.pathname.replace(/^(\/)/, "");
    if (pathname === "content") {
      return NextResponse.next();
    }

    // Middleware for route /blog
    const token = request.cookies.get("token");
    const tokenValue = token?.value;

    if (!tokenValue) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const secretJWK = {
      kty: "oct",
      k: process.env.JWT_SECRET,
    };
    const secretKey = await importJWK(secretJWK, "HS256");
    const { payload } = await jwtVerify(tokenValue, secretKey);

    if (payload.email !== "admin") {
      throw new Error("Email incorrect");
    }

    // Pass user data to headers
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("user", JSON.stringify({ email: payload.email }));
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    return response;
  } catch (error) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/content/:path*", "/blog/:path*"],
};
