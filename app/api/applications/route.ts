import { NextRequest, NextResponse } from "next/server"
import Application from "@/models/applicationModel"
import { validateJWT } from "@/helpers/validateJWT"
import { connectDB } from "@/config/dbConfig"

// Função de conexão com o banco de dados
connectDB()

// Post a new job
export async function POST(req: NextRequest) {
  try {
    await validateJWT(req)

    const reqBody = await req.json()
    console.log(reqBody)

    const filterObj: any = {}
    filterObj["job"] = reqBody.job
    filterObj["user"] = reqBody.user

    const doesApplicationAlreadyExists = await Application.findOne(filterObj)

    if (doesApplicationAlreadyExists) {
      return NextResponse.json(
        { message: "Application already exists" },
        {
          status: 400,
        }
      )
    }

    const application = await Application.create(reqBody)

    return NextResponse.json(
      { message: "Application created successfully", data: application },
      { status: 201 }
    )
  } catch (error: any) {
    if (error.message.includes("E11000 duplicate key error")) {
      return NextResponse.json(
        { message: "Application already exists" },
        { status: 409 }
      )
    }

    console.log(error)
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}

// Get all the jobs from a particular company
export async function GET(req: NextRequest) {
  try {
    await validateJWT(req)

    // THIS CODE DOWN BELOW IS JUST TO REMEMBER HOW TO DEAL
    // WITH QUERY PARAMS:
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get("user")
    const jobId = searchParams.get("job")

    const filterObj: any = {}

    if (userId) {
      filterObj["user"] = userId
    }

    if (jobId) {
      filterObj["job"] = jobId
    }

    const applications = await Application.find(filterObj)
      .populate("user", "-password")
      .populate({
        path: "job",
        populate: {
          path: "user",
          select: "-password",
        },
      })

    if (!applications) {
      return NextResponse.json(
        { message: "No applications found" },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { message: "Applications found", data: applications },
      { status: 200 }
    )
  } catch (error: any) {
    console.log(error.message)
    return NextResponse.json({ message: error.message }, { status: 403 })
  }
}
