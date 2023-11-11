"use client"
import JobPostForm from "@/components/JobPostForm"
import PageTitle from "@/components/PageTitle"
import { Button, Form } from "antd"
import { useRouter } from "next/navigation"
import React from "react"
import { useSelector } from "react-redux"

export default function NewJob() {
  const router = useRouter()
  const { currentUser } = useSelector((state: any) => state.users)

  const onFinish = async (values: any) => {
    values.company = currentUser.name
    console.log(values)
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Post New Job" />
        <Button type="default" onClick={() => router.back()}>
          Back
        </Button>
      </div>
      <Form layout="vertical" onFinish={onFinish}>
        <JobPostForm />
        <div className="flex justify-end items-center gap-3 my-2">
          <Button type="primary" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Post Job
          </Button>
        </div>
      </Form>
    </div>
  )
}
