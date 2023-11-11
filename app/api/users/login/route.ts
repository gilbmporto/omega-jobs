import bcrypt from "bcryptjs"
import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/config/dbConfig"
import User from "@/models/userModel"
import jwt from "jsonwebtoken"

// Função de conexão com o banco de dados
connectDB()

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json()

    // Verifica se o usuário já existe
    const user = await User.findOne({
      email: reqBody.email,
    })
    if (!user) {
      return NextResponse.json(
        { message: "User doesn't exist" },
        { status: 404 }
      )
    }

    const validPassword = await bcrypt.compare(reqBody.password, user.password)
    if (!validPassword) {
      return NextResponse.json({ message: "Invalid password" }, { status: 403 })
    }

    // Create the token
    const dataToBeSigned = {
      userId: user._id,
      email: user.email,
    }
    const token = jwt.sign(dataToBeSigned, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    })

    const response = NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    )

    // set cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 1000, // 1 day
    })

    return response
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}
