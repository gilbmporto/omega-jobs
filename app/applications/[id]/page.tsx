"use client"
import PageTitle from "@/components/PageTitle"
import formatJobTypeString from "@/helpers/formatString"
import { Button, Card, Col, Row, Tag, message } from "antd"
import axios from "axios"
import moment from "moment"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"

export default function Application({ params }: { params: { id: string } }) {
  const { id } = params
  const router = useRouter()
  const [application, setApplication] = useState<any>(null)

  const fetchApplication = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/api/applications/${id}`
      )
      setApplication(res.data.data)
    } catch (error: any) {
      message.error(error.message)
    }
  }

  useEffect(() => {
    fetchApplication()
  }, [])

  return (
    application && (
      <>
        <div className="flex justify-between items-center">
          <PageTitle title="Application" />
          <Button type="default" onClick={() => router.back()}>
            Back
          </Button>
        </div>
        <div className="my-3">
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card title={application.job.title} bordered={false}>
                <div className="main-page-card">
                  <h3>
                    <strong>Company:</strong> {application.job?.user?.name}
                  </h3>
                  <h4>
                    <strong>Status:</strong>{" "}
                    <Tag
                      color={
                        application.status === "pending"
                          ? "green"
                          : application.status === "shortlisted"
                          ? "blue"
                          : "red"
                      }
                      style={{
                        fontSize: "1rem",
                        padding: " 0.2rem 0.3rem",
                        marginLeft: "0.2rem",
                      }}
                    >
                      {application.status}
                    </Tag>
                  </h4>
                  <p>
                    <strong>Posted on:</strong>{" "}
                    {moment(application.createdAt).format(
                      "DD/MM/YYYY HH:mm:ss"
                    )}
                  </p>
                  <p>
                    <strong>Job Type</strong>:{" "}
                    {formatJobTypeString(application.job.jobType)}
                  </p>
                  <p>
                    <strong>Location</strong>: {application.job.location}
                  </p>
                  <p>
                    <strong>Experience</strong>: {application.job.experience}
                  </p>
                  <p>
                    <strong>Salary</strong>:{" "}
                    <span>
                      {application.job.salaryFromRange} USD -{" "}
                      {application.job.salaryToRange} USD
                    </span>
                  </p>
                  <p>
                    <strong>Work Mode</strong>:{" "}
                    {application.job.workMode.charAt(0).toUpperCase() +
                      application.job.workMode.slice(1)}
                  </p>
                  <p>
                    <strong>Description</strong>: {application.job.description}
                  </p>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    )
  )
}
