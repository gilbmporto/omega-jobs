import axios from "axios"

export default async function checkEmail(email: string) {
  const res = await axios.get(
    `https://api.hunter.io/v2/email-verifier?email=${email}&api_key=f4cd14b193f1e8d8275cbb0f787f063c2ec9880c`
  )

  return res.data
}
