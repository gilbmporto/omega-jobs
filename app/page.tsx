import axios from "axios"
import { cookies } from "next/headers"

// Getting data using server side components
export async function getUser() {
  try {
    const token: any = cookies().get("token")

    const res = await axios.get("http://localhost:3000/api/users/me", {
      headers: {
        Cookie: `token=${token.value}`,
      },
    })

    if (res.status === 200) {
      return res.data.data
    } else {
      // Handle error status codes
      console.error(`API Error: ${res.status} - ${res.data.message}`)
      return null // Return null instead of false
    }
  } catch (err: any) {
    if (err.response && err.response.status === 403) {
      return null // Return null instead of false
    }
  }
}

export default async function Home() {
  const user: any = await getUser()

  return (
    <div>
      <h1>Home</h1>
      <h2>Current User: {user?.name ? user.name : "Loading..."}</h2>
    </div>
  )
}
