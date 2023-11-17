"use client"
import JobPostForm from "@/components/JobPostForm"
import PageTitle from "@/components/PageTitle"
import { setIsLoading } from "@/redux/loadingsSlice"
import { Button, Form, message } from "antd"
import axios from "axios"
import { useRouter } from "next/navigation"
import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "next/navigation"

export default function EditJob() {
  const [jobData, setJobData] = React.useState<any>(null)

  const router = useRouter()

  const { jobid } = useParams()

  const dispatch = useDispatch()

  const onFinish = async (values: any) => {
    try {
      dispatch(setIsLoading(true))

      // Set the values with the current job id
      values._id = jobid
      const res = await axios.put(`http://localhost:3000/api/jobs`, values, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      message.success(res.data.message)

      // router.push("/jobs")
    } catch (error: any) {
      message.error(error.message)
    } finally {
      dispatch(setIsLoading(false))
    }
  }

  const fetchJobData = async () => {
    try {
      dispatch(setIsLoading(true))

      const res = await axios.get(`http://localhost:3000/api/jobs/${jobid}`)

      setJobData(res.data.data)
    } catch (error: any) {
      message.error(error.message)
    } finally {
      dispatch(setIsLoading(false))
    }
  }

  useEffect(() => {
    fetchJobData()
  }, [])

  return (
    jobData && (
      <div>
        <div className="flex justify-between items-center">
          <PageTitle title="Edit Job" />
          <Button type="default" onClick={() => router.back()}>
            Back
          </Button>
        </div>
        <Form layout="vertical" onFinish={onFinish} initialValues={jobData}>
          <JobPostForm />
          <div className="flex justify-end items-center gap-3 my-2">
            <Button type="primary" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Update Job
            </Button>
          </div>
        </Form>
      </div>
    )
  )
}
