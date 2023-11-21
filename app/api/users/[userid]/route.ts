import { NextRequest, NextResponse } from "next/server"
import User from "@/models/userModel"
import { validateJWT } from "@/helpers/validateJWT"
import { connectDB } from "@/config/dbConfig"

// Função de conexão com o banco de dados
connectDB()

export async function GET(
  req: NextRequest,
  { params }: { params: { userid: string } }
) {
  try {
    await validateJWT(req)

    const { userid } = params

    const user = await User.findById(userid).select("-password")

    if (!user) {
      return new NextResponse("User not found", {
        status: 404,
      })
    }

    return NextResponse.json(
      { message: "User found", data: user },
      { status: 200 }
    )
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}
