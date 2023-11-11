import { NextRequest, NextResponse } from "next/server"
import { jwtDecode } from "jwt-decode"

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value

    const decoded: any = jwtDecode(token!)

    const currentTime = Math.floor(Date.now() / 1000)

    if (decoded.exp < currentTime) {
      return NextResponse.json(
        { message: "Your access expired, please log in again" },
        { status: 401 }
      )
    }

    return NextResponse.json({ message: decoded }, { status: 200 })
  } catch (err: any) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}
