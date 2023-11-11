import React from "react"

export default function PageTitle({ title }: { title: string }) {
  return (
    <div className="my-3">
      <h1 className="text-2xl font-semibold my-2">{title}</h1>
      <hr className="divider" />
    </div>
  )
}
