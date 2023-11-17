import { NextRequest, NextResponse } from "next/server"
import { checkJWT } from "./helpers/checkJWT"

export default async function middleware(req: NextRequest) {
  try {
    const isPublicPage =
      req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/register"

    //if there is no token, redirect to login page
    const token = req.cookies.get("token")?.value

    if (!token && !isPublicPage) {
      console.log("Going back to login page (Back-end)")
      return NextResponse.redirect(new URL("/login", req.nextUrl))
    }

    // otherwise, redirect to home page
    if (token && isPublicPage) {
      return NextResponse.redirect(new URL("/", req.nextUrl))
    }

    return NextResponse.next()
  } catch (err) {
    return NextResponse.json(err, { status: 500 })
  }
}

export const config = {
  matcher: ["/", "/login", "/register"],
}
