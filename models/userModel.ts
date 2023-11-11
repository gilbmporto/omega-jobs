import mongoose from "mongoose"

// Esquema do usuário
const userSchema = new mongoose.Schema(
  {
    userType: {
      type: String,
      required: true,
      default: "employee",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },

    // additional fields for employee
    skills: {
      type: [],
      required: false,
    },
    experience: {
      type: [],
      required: false,
    },
    education: {
      type: [],
      required: false,
    },
    careerObjective: {
      type: String,
      required: false,
    },

    // additional properties for employer
    establishmentYear: {
      type: String,
      required: false,
    },
    companySize: {
      type: String,
      required: false,
    },
    website: {
      type: String,
      required: false,
    },
    about: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
  },

  {
    timestamps: true,
  }
)

// Registra o modelo apenas se ele ainda não foi registrado
const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User
