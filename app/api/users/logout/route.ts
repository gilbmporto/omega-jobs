import { NextResponse } from "next/server"

export async function POST() {
  try {
    const response = NextResponse.json(
      { message: "Logout successfully!" },
      { status: 200 }
    )

    response.cookies.set("token", "", { maxAge: 0 })

    return response
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
