import jwt from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server"

export const checkJWT = async (token: string) => {
  try {
    if (!token) {
      return NextResponse.json(
        { message: "No token provided" },
        { status: 401 }
      )
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET!)

    if (!decodedData) {
      console.log("Error in verifying token:")
      console.log(decodedData)
      return false
    }

    return true
  } catch (err: any) {
    throw new Error(err.message)
  }
}
