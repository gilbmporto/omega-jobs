import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export const validateJWT = async (req: NextRequest) => {
  try {
    const token = req.cookies.get("token")?.value

    if (!token) {
      return NextResponse.json({ message: "No token provided" }, { status: 401 })
    }

    const decodedData: any = jwt.verify(token, process.env.JWT_SECRET!)

    return decodedData.userId
  } catch (err: any) {
    throw new Error(err.message)
  }
}
