import { NextResponse } from 'next/server';

export default function middleware(req) {
  const tokenCookie = req.cookies.get('token');
  const userTypeCookie = req.cookies.get('userType');
  const loggedin = tokenCookie ? tokenCookie.value : null;
  const userType = userTypeCookie ? userTypeCookie.value : null;
  const { pathname } = req.nextUrl;
  const dashboardRoutes = {
    hr: '/hr/dashboard',
    client: '/client/dashboard',
    employee: '/employee/dashboard',
  };
  if (userType == null && pathname != '/') {
    return NextResponse?.redirect(new URL('/', req?.url)?.toString());
  }
  if (
    loggedin &&
    userType &&
    dashboardRoutes[userType] &&
    pathname !== dashboardRoutes[userType]
  ) {
    if (!pathname?.startsWith(dashboardRoutes[userType])) {
      return NextResponse.redirect(new URL(dashboardRoutes[userType], req.url));
    }
  }
  if (userType) {
    if (
      userType !== 'client' &&
      loggedin &&
      userType !== 'employee' &&
      loggedin &&
      !pathname?.startsWith(dashboardRoutes?.hr)
    ) {
      return NextResponse.redirect(
        new URL(dashboardRoutes?.hr, req.url).toString()
      );
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|image|images|icons|favicon.ico).*)'],
};
