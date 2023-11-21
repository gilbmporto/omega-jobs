import React from "react"

export default function EmployerInfo({ userInfo }: { userInfo: any }) {
  return userInfo && <div>{userInfo.name}</div>
}
