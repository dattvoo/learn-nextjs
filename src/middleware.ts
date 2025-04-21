import { NextRequest, NextResponse } from "next/server";

const privatePaths = ["/manage"];

const publicPaths = ["/login"];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // console.log("pathName", pathname);
  const isAuth = Boolean(request.cookies.get("accessToken")?.value);
  console.log("hehe ", request.cookies.get("accessToken")?.value);
  // neu chua dang nhap nhung van vao route thi redirect ve login
  if (privatePaths.some((path) => pathname.startsWith(path)) && !isAuth) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // Neu da dang nhap thi k vao dc trang login

  if (publicPaths.some((path) => pathname.startsWith(path)) && isAuth) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/login", "/manage/:path*"],
};
