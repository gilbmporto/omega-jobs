"use client"
import PageTitle from "@/components/PageTitle"
import formatJobTypeString from "@/helpers/formatString"
import { setIsLoading } from "@/redux/loadingsSlice"
import { Card, Col, Row, message } from "antd"
import axios from "axios"
import moment from "moment"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function Home() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state: any) => state.users)
  const [jobs, setJobs] = useState([])
  console.log(jobs)

  const fetchJobs = async () => {
    try {
      dispatch(setIsLoading(true))

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/api/jobs/all`
      )
      setJobs(res.data.data)
    } catch (error: any) {
      message.error(error.message)
    } finally {
      dispatch(setIsLoading(false))
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  console.log(jobs)

  return (
    <>
      <PageTitle title="Home" />
      <h2>Opportunities</h2>
      <br />
      <Row gutter={[16, 16]}>
        {jobs.map((job: any) => (
          <Col key={job._id} span={8} className="py-3">
            <Card
              title={job.title}
              bordered={true}
              extra={<i className="ri-verified-badge-line"></i>}
              onClick={() => router.push(`/jobsinfo/${job._id}`)}
            >
              <div className="main-page-card">
                <h3>
                  <strong>Company:</strong> {job.user ? job.user?.name : "N/A"}
                </h3>
                <p>
                  <strong>Posted on:</strong>{" "}
                  {moment(job.createdAt).format("DD/MM/YYYY HH:mm:ss")}
                </p>
                <p>
                  <strong>Job Type</strong>: {formatJobTypeString(job.jobType)}
                </p>
                <p>
                  <strong>Location</strong>: {job.location}
                </p>
                <p>
                  <strong>Experience</strong>: {job.experience}
                </p>
                <p>
                  <strong>Salary</strong>:{" "}
                  <span>
                    {job.salaryFromRange} USD - {job.salaryToRange} USD
                  </span>
                </p>
                <p>
                  <strong>Work Mode</strong>:{" "}
                  {job.workMode.charAt(0).toUpperCase() + job.workMode.slice(1)}
                </p>
                <p>
                  <strong>Description</strong>: {job.description}
                </p>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}
