import { NextRequest, NextResponse } from "next/server"
import { validateJWT } from "@/helpers/validateJWT"
import { connectDB } from "@/config/dbConfig"
import Application from "@/models/applicationModel"

// Função de conexão com o banco de dados
connectDB()

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await validateJWT(req)

    console.log(params.id)

    const application = await Application.findById(params.id)
      .populate("user")
      .populate({
        path: "job",
        populate: {
          path: "user",
        },
      })

    return NextResponse.json(
      { message: "Application found", data: application },
      { status: 200 }
    )
  } catch (error: any) {
    console.log(error.message)
    return NextResponse.json({ message: error.message }, { status: 403 })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await validateJWT(req)

    const reqBody = await req.json()

    const { id } = params

    const updatedApplication = await Application.findByIdAndUpdate(
      id,
      reqBody,
      {
        new: true,
        runValidators: true,
      }
    )

    return NextResponse.json(
      {
        message: "Application updated successfully!",
        data: updatedApplication,
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.log(`${error.name}: ${error.message}`)
    return NextResponse.json({ message: error.message }, { status: 403 })
  }
}
