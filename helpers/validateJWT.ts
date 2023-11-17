import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export const validateJWT = async (req: NextRequest) => {
  try {
    const token = req.cookies.get("token")?.value

    if (!token) {
      return NextResponse.json(
        { message: "No token provided" },
        { status: 401 }
      )
    }

    const decodedData: any = jwt.verify(token, process.env.JWT_SECRET!)

    return decodedData.userId
  } catch (err: any) {
    console.log("==========================================")
    console.log("An error was thrown inside validateJWT.ts:")
    console.log(`${err.name}: ${err.message}`)
    console.log("==========================================")
    throw new Error(`${err.name}: ${err.message}`)
  }
}
