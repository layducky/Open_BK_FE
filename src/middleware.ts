import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const LEARNER_ROUTES = ["/learner"];
const COLLAB_ROUTES = ["/collaborator"];
const AUTH_ROUTES = ["/auth/login", "/auth/register"];

function isLearnerRoute(pathname: string): boolean {
  return LEARNER_ROUTES.some((r) => pathname.startsWith(r));
}

function isCollabRoute(pathname: string): boolean {
  return COLLAB_ROUTES.some((r) => pathname.startsWith(r));
}

function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.some((r) => pathname === r || pathname.startsWith(r + "/"));
}

function getDashboardForRole(role: string): string {
  switch (role) {
    case "LEARNER":
      return "/learner/dashboard";
    case "COLLAB":
      return "/collaborator/dashboard";
    case "ADMIN":
      return "/collaborator/dashboard";
    default:
      return "/learner/dashboard";
  }
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuthenticated = !!token;
  const role = (token?.role as string) || "";

  if (isAuthRoute(pathname)) {
    if (isAuthenticated) {
      const dashboard = getDashboardForRole(role);
      return NextResponse.redirect(new URL(dashboard, request.url));
    }
    return NextResponse.next();
  }

  if (isLearnerRoute(pathname) || isCollabRoute(pathname)) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (isLearnerRoute(pathname) && role === "COLLAB") {
      return NextResponse.redirect(new URL("/collaborator/dashboard", request.url));
    }

    if (isCollabRoute(pathname) && role === "LEARNER") {
      return NextResponse.redirect(new URL("/learner/dashboard", request.url));
    }

    return NextResponse.next();
  }

  const isCourseContent = /^\/course\/[^/]+\/content/.test(pathname);
  const isTestRoute = pathname.startsWith("/test");
  const needsAuth = isCourseContent || isTestRoute;

  if (needsAuth && !isAuthenticated) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
