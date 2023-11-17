import { NextRequest, NextResponse } from "next/server"
import Job from "@/models/jobModel"
import { validateJWT } from "@/helpers/validateJWT"
import { connectDB } from "@/config/dbConfig"

// Função de conexão com o banco de dados
connectDB()

// Get all the jobs from a particular company
export async function GET(req: NextRequest) {
  try {
    await validateJWT(req)

    const jobs = await Job.find().populate("user")
    if (!jobs) {
      return NextResponse.json({ message: "Jobs not found" }, { status: 404 })
    }

    return NextResponse.json(
      { message: "Jobs found", data: jobs },
      { status: 200 }
    )
  } catch (error: any) {
    console.log(error.message)
    return NextResponse.json({ message: error.message }, { status: 403 })
  }
}
