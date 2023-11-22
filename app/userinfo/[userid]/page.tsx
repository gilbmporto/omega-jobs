"use client"
import EmployeeInfo from "@/components/EmployeeInfo"
import EmployerInfo from "@/components/EmployerInfo"
import PageTitle from "@/components/PageTitle"
import { setIsLoading } from "@/redux/loadingsSlice"
import { message } from "antd"
import axios from "axios"
import { useRouter } from "next/navigation"
import React from "react"
import { useDispatch } from "react-redux"

export default function UserInfo({ params }: { params: { userid: string } }) {
  const dispatch = useDispatch()
  const router = useRouter()
  const [userInfo, setUserInfo] = React.useState<any>(null)

  const fetchUserInfo = async (): Promise<void> => {
    try {
      dispatch(setIsLoading(true))
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/api/users/${params.userid}`
      )
      setUserInfo(res.data.data)
    } catch (error: any) {
      message.error(error.response.data.message || "Something went wrong")
    } finally {
      dispatch(setIsLoading(false))
    }
  }

  React.useEffect(() => {
    fetchUserInfo()
  }, [])

  return (
    userInfo && (
      <div>
        <PageTitle
          title={`${
            userInfo?.userType === "employer" ? "Employer" : "Employee"
          } Info`}
        />

        {userInfo?.userType === "employer" ? (
          <EmployerInfo userInfo={userInfo} />
        ) : (
          <EmployeeInfo userInfo={userInfo} />
        )}
      </div>
    )
  )
}
