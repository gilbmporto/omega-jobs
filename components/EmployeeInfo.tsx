import React from "react"

export default function EmployeeInfo({ userInfo }: { userInfo: any }) {
  return <div>{userInfo?.name}</div>
}
