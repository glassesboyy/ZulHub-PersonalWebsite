import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  const response = NextResponse.next();

  // Add pathname header
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);
  response.headers.set("x-pathname", request.nextUrl.pathname);

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookies) => {
          cookies.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Only handle redirects if we successfully got the user status
    if (user === null && request.nextUrl.pathname.startsWith("/protected")) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    if (user && request.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("/protected", request.url));
    }
  } catch (error) {
    // On error, just proceed with the request
    console.error("Auth error:", error);
  }

  return response;
};
