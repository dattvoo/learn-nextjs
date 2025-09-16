import { NextRequest, NextResponse } from "next/server";
import { decodeToken } from "./lib/utils";
import { Role } from "./constant/type";

const managePaths = ["/manage"];
const guestPath = ["/guest"];
// Bao gom nhung paths phai dang nhap
const privatePaths = [...managePaths, ...guestPath];

const unAuthPaths = ["/login"];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isAuth = Boolean(accessToken);
  // 1. Chua dang nhap hi khong cho private path
  if (privatePaths.some((path) => pathname.startsWith(path)) && !isAuth) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  //  2. Da dang nhap
  if (refreshToken) {
    // 2.1 Neu co tinh vao trang login se redirect ve trang chu

    if (unAuthPaths.some((path) => pathname.startsWith(path)) && isAuth) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    //2.2 Truong hop dang nhap roi, nhung accesstoken het han

    if (
      privatePaths.some((path) => path.startsWith(path)) &&
      !accessToken &&
      refreshToken
    ) {
      const url = new URL("/refresh-token", request.url);
      url.searchParams.set("refreshtoken", refreshToken);
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }

    // 2.3 Vao khong dung role thi redirect ve trang chu
    const role = decodeToken(refreshToken).role;
    // Guest nhung co vao route manage
    const isGuestGoToManagePath =
      role === Role.Guest &&
      managePaths.some((path) => pathname.startsWith(path));

    // Khong phai guest nhung vao route guest
    const isNotGuestGoToGuestPath =
      role !== Role.Guest &&
      guestPath.some((path) => pathname.startsWith(path));
    if (isGuestGoToManagePath || isNotGuestGoToGuestPath) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/login", "/logout", "/guest/:path*", "/manage/:path*"],
};
