import { NextRequest, NextResponse } from "next/server"
import Job from "@/models/jobModel"
import { validateJWT } from "@/helpers/validateJWT"
import { connectDB } from "@/config/dbConfig"

// Função de conexão com o banco de dados
connectDB()

export async function GET(
  req: NextRequest,
  { params }: { params: { jobid: string } }
) {
  try {
    await validateJWT(req)

    const job = await Job.findById(params.jobid).populate("user")
    if (!job) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 })
    }

    return NextResponse.json(
      { message: "Jobs found", data: job },
      { status: 200 }
    )
  } catch (error: any) {
    console.log(error.message)
    return NextResponse.json({ message: error.message }, { status: 403 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { jobid: string } }
) {
  try {
    await validateJWT(req)

    const job = await Job.findByIdAndDelete(params.jobid)
    if (!job) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 })
    }

    return NextResponse.json(
      { message: "Job deleted successfully", data: job },
      { status: 200 }
    )
  } catch (error: any) {
    console.log(error.message)
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}
