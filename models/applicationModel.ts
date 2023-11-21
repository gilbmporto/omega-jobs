import mongoose from "mongoose"

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "jobs",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "shortlisted", "rejected"],
    },
  },
  { timestamps: true }
)

const Application =
  mongoose.models.applications ||
  mongoose.model("applications", applicationSchema)

export default Application
