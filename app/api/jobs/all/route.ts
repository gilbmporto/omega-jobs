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

    const { searchParams } = new URL(req.url)

    const searchText = searchParams.get("searchText")
    const location = searchParams.get("location")

    const filtersObject: any = {}

    if (searchText) {
      filtersObject.title = { $regex: searchText, $options: "i" }
    }
    if (location) {
      filtersObject.location = { $regex: location, $options: "i" }
    }

    const jobs = await Job.find(filtersObject).populate("user", "-password")
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
