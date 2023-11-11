import mongoose from "mongoose"

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    salaryFromRange: {
      type: Number,
      required: true,
    },
    salaryToRange: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    workMode: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const Job = mongoose.models.jobs || mongoose.model("jobs", jobSchema)

export default Job
