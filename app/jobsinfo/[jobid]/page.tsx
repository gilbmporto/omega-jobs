"use client"
import PageTitle from "@/components/PageTitle"
import formatJobTypeString from "@/helpers/formatString"
import { setIsLoading } from "@/redux/loadingsSlice"
import { Button, Card, Col, Row, message } from "antd"
import axios from "axios"
import moment from "moment"
import { useRouter } from "next/navigation"
import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function JobInfo({ params }: { params: { jobid: string } }) {
  const { currentUser } = useSelector((state: any) => state.users)
  const router = useRouter()
  const dispatch = useDispatch()
  const [jobInfo, setJobInfo] = useState<any>(null)
  const [applications, setApplications] = useState<any>(null)
  const notificationDisplayedRef = useRef(false)

  const getJobInfo = async (jobid: string) => {
    try {
      dispatch(setIsLoading(true))
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/api/jobs/${jobid}`
      )

      setJobInfo(res.data.data)
      if (!notificationDisplayedRef.current) {
        // message.success(res.data.message)
        notificationDisplayedRef.current = true
      }
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        if (!notificationDisplayedRef.current) {
          message.error(error.message)
          notificationDisplayedRef.current = true
        }
      }
    } finally {
      dispatch(setIsLoading(false))
    }
  }

  const fetchApplications = async () => {
    try {
      dispatch(setIsLoading(true))
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/api/applications?job=${params.jobid}&user=${currentUser?._id}`
      )
      setApplications(res.data.data)
      if (res.data.data?.length > 0) {
        if (!notificationDisplayedRef.current) {
          message.warning("You already applied to this job")
        }
      }
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        if (!notificationDisplayedRef.current) {
          message.error(error.message)
          notificationDisplayedRef.current = true
        }
      }
    } finally {
      dispatch(setIsLoading(false))
    }
  }

  useEffect(() => {
    getJobInfo(params.jobid)
    fetchApplications()
  }, [])

  console.log(jobInfo)
  console.log(currentUser)
  console.log(applications)

  const onApply = async () => {
    try {
      dispatch(setIsLoading(true))
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/api/applications`,
        {
          job: jobInfo._id,
          user: currentUser._id,
          status: "pending",
        }
      )
      message.success(res.data.message)
      router.refresh()
    } catch (error: any) {
      message.error(error.response.data.message || "Something went wrong")
    } finally {
      dispatch(setIsLoading(false))
    }
  }

  return (
    jobInfo && (
      <div>
        <PageTitle title={jobInfo?.title} />
        <Row gutter={[16, 16]}>
          <Col span={12} className="py-2">
            <div className="flex flex-col gap-4">
              <h3>
                <strong>Company:</strong>{" "}
                {jobInfo?.user ? jobInfo?.user.name : "N/A"}
              </h3>
              <p>
                <strong>Posted on:</strong>{" "}
                {moment(jobInfo?.createdAt).format("DD/MM/YYYY HH:mm:ss")}
              </p>
              <p>
                <strong>Job Type</strong>:{" "}
                {formatJobTypeString(jobInfo.jobType)}
              </p>
              <p>
                <strong>Location</strong>: {jobInfo?.location}
              </p>
              <p>
                <strong>Experience</strong>: {jobInfo?.experience}
              </p>
              <p>
                <strong>Salary</strong>:{" "}
                <span>
                  {jobInfo?.salaryFromRange} USD - {jobInfo?.salaryToRange} USD
                </span>
              </p>
              <p>
                <strong>Work Mode</strong>:{" "}
                {jobInfo?.workMode.charAt(0).toUpperCase() +
                  jobInfo?.workMode.slice(1)}
              </p>
            </div>
          </Col>
          <Col span={24} className="py-2">
            <h1 className="text-md">Job Description</h1>
            <hr className="my-4 min-w-400" />
            <span>{jobInfo.description}</span>
          </Col>
          {applications?.length > 0 && (
            <Col span={24}>
              <Card>
                <div className="flex items-center justify-center">
                  <i className="ri-error-warning-line"></i>
                  <span>
                    You have already applied for this job. Please wait for the
                    employer to respond.
                  </span>
                </div>
              </Card>
            </Col>
          )}
          <Col span={24}>
            <div className="flex justify-end gap-3">
              <Button type="default" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button
                type="default"
                onClick={() =>
                  router.push(
                    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/userinfo/${jobInfo?.user?._id}`
                  )
                }
              >
                View Company Info
              </Button>
              <Button
                type="primary"
                onClick={async () => await onApply()}
                disabled={
                  currentUser?.userType === "employer" ||
                  applications?.length > 0
                }
              >
                Apply
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    )
  )
}
