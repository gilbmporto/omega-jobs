import { NextRequest, NextResponse } from "next/server"
import User from "@/models/userModel"
import { validateJWT } from "@/helpers/validateJWT"
import { connectDB } from "@/config/dbConfig"

// Função de conexão com o banco de dados
connectDB()

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value
    if (!token) {
      return NextResponse.json(
        { message: "No token provided" },
        { status: 401 }
      )
    }

    const userId = await validateJWT(req)

    const user = await User.findById(userId).select("-password") // So we don't get the user password
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    return NextResponse.json(
      { message: "User found", data: user },
      { status: 200 }
    )
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ message: error.message }, { status: 403 })
  }
}
