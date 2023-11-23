import { NextRequest, NextResponse } from "next/server"
import { validateJWT } from "@/helpers/validateJWT"
import { connectDB } from "@/config/dbConfig"
import Application from "@/models/applicationModel"
import { sendEmail } from "@/helpers/sendEmail"
import moment from "moment"

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
      .populate("user", "-password")
      .populate({
        path: "job",
        populate: {
          path: "user",
          select: "-password",
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
      .populate("user", "-password")
      .populate({
        path: "job",
        populate: {
          path: "user",
          select: "-password",
        },
      })

    await sendEmail({
      to: updatedApplication.user.email,
      subject: "Your application status has been updated",
      text: `Your application status has been updated to ${updatedApplication.status}`,
      html: `<div>
      <p>Your application status has been updated to ${
        updatedApplication.status
      }</p>
      <p>Company: ${updatedApplication.job.user.name}</p>
      <p>Job: ${updatedApplication.job.title}</p>
      <p>Applied On: ${moment(updatedApplication.createdAt).format(
        "DD/MM/YYYY"
      )}</p>
      <p>Thank you for using OmegaJobs!</p>
      </div>`,
    })

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
