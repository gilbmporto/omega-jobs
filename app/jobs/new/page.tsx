"use client"
import JobPostForm from "@/components/JobPostForm"
import PageTitle from "@/components/PageTitle"
import { setIsLoading } from "@/redux/loadingsSlice"
import { Button, Form, message } from "antd"
import axios from "axios"
import { useRouter } from "next/navigation"
import React from "react"
import { useDispatch } from "react-redux"

export default function NewJob() {
  const router = useRouter()
  const dispatch = useDispatch()

  const onFinish = async (values: any) => {
    try {
      dispatch(setIsLoading(true))

      const res = await axios.post(`http://localhost:3000/api/jobs`, values, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      message.success(res.data.message)

      router.push("/jobs")
    } catch (error: any) {
      message.error(error.message)
    } finally {
      dispatch(setIsLoading(false))
    }
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
