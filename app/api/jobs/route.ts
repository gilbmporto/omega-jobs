import { NextRequest, NextResponse } from "next/server"
import Job from "@/models/jobModel"
import { validateJWT } from "@/helpers/validateJWT"
import { connectDB } from "@/config/dbConfig"

// Função de conexão com o banco de dados
connectDB()

// Get all the jobs from a particular company
export async function GET(req: NextRequest) {
  try {
    const userId = await validateJWT(req)

    // THIS CODE DOWN BELOW IS JUST TO REMEMBER HOW TO DEAL
    // WITH QUERY PARAMS:
    // const { searchParams } = new URL(req.url)
    // console.log(searchParams.get("user"))

    const jobs = await Job.find({ user: userId })
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

// Post a new job
export async function POST(req: NextRequest) {
  try {
    const userId = await validateJWT(req)

    const reqBody = await req.json()
    const job = await Job.create({ ...reqBody, user: userId })

    return NextResponse.json(
      { message: "Job created successfully", data: job },
      { status: 201 }
    )
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    await validateJWT(req)

    const reqBody = await req.json()

    // Encontre o trabalho atual na base de dados
    const actualJob = await Job.findById(reqBody._id)
    if (!actualJob) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 })
    }

    // Defina os campos a serem comparados
    const fieldsToCompare = [
      "title",
      "description",
      "jobType",
      "location",
      "experience",
      "workMode",
      "salaryFromRange",
      "salaryToRange",
    ]

    // Compare os dados enviados com os dados atuais
    const isSame = fieldsToCompare.every(
      (field) => actualJob[field].toString() === reqBody[field].toString()
    )

    if (isSame) {
      return NextResponse.json(
        { message: "No updates, job data is the same as before." },
        { status: 200 }
      )
    }

    const job = await Job.findByIdAndUpdate(reqBody._id, reqBody, {
      new: true,
    })

    return NextResponse.json(
      { message: "Job updated successfully", data: job },
      { status: 200 }
    )
  } catch (error: any) {
    console.log(`${error.name}: ${error.message}`)

    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}
