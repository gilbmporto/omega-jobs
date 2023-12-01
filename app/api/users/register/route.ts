import bcrypt from "bcryptjs"
import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/config/dbConfig"
import User from "@/models/userModel"
import axios from "axios"
import checkEmail from "@/helpers/checkEmail"

// Função de conexão com o banco de dados
connectDB()

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json()
    const { name, email, password, isAdmin, userType } = reqBody

    // Verifica se o usuário já existe
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 403 }
      )
    }

    const checkedEmail = await checkEmail(email)

    if (checkedEmail?.data?.status === "invalid") {
      return NextResponse.json(
        { message: "This email is not valid" },
        { status: 403 }
      )
    }

    // Hash da senha
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Criação do usuário
    const user = new User({
      userType,
      name,
      email,
      password: hashedPassword,
      isAdmin: isAdmin, // Garante que o valor seja um booleano
    })

    await user.save()

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    )
  } catch (error: any) {
    console.log(`${error.name}: ${error.message}`)
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}
