import {cookies} from "next/headers";
import {ACCESSTOKEN, REFRESHTOKEN} from "./constants/constant";
import {NextRequest, NextResponse} from "next/server";

const publicRoutes: {[key: string]: boolean} = {
  "/": true,
  "/login": true,
  "/join": true,
};
export async function middleware(req: NextRequest) {
  const cookie = await cookies();
  const access = cookie.get(ACCESSTOKEN);
  const refresh = cookie.get(REFRESHTOKEN);
  const res = NextResponse.next();

  if (!access && !refresh) {
    if (!publicRoutes[req.nextUrl.pathname]) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  } else {
    if (publicRoutes[req.nextUrl.pathname]) {
      return NextResponse.redirect(new URL("/my-page", req.url));
    }
  }

  if (!access && refresh) {
    try {
      const response = await fetch(
        "http://localhost:4000/auth/regenerateAccess",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${refresh?.value}`,
          },
        }
      );
      if (!response.ok) {
        res.cookies.set({name: REFRESHTOKEN, value: "", maxAge: 0, path: "/"});
        return NextResponse.redirect(new URL("/", req.url));
      }
      const {token} = (await response.json()) as {token: string};
      res.cookies.set({
        name: ACCESSTOKEN,
        value: token,
        httpOnly: true,
        sameSite: "strict",
        path: "/",
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        maxAge: 60 * 60 * 24,
      });
    } catch (error) {
      res.cookies.set({name: REFRESHTOKEN, value: "", maxAge: 0, path: "/"});
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return res;
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
