import mongoose from "mongoose"

export function connectDB() {
  try {
    mongoose.connect(process.env.MONGODB_URI!)
    const connection = mongoose.connection

    connection.on("connected", () => console.log("MongoDB connected"))

    connection.on("error", (err) => console.log(err))
  } catch (error) {
    console.log(error)
  }
}
