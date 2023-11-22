"use client"
import { setIsLoading } from "@/redux/loadingsSlice"
import { Modal, Select, Table, Tooltip, message } from "antd"
import axios from "axios"
import moment from "moment"
import { useRouter } from "next/navigation"
import React from "react"
import { useDispatch } from "react-redux"

export default function Applications({
  showApplications,
  setShowApplications,
  selectedJob,
}: {
  showApplications: boolean
  setShowApplications: (showApplications: boolean) => void
  selectedJob: any
}) {
  const dispatch = useDispatch()
  const router = useRouter()
  const [applications, setApplications] = React.useState([])

  const fetchApplications = async () => {
    try {
      dispatch(setIsLoading(true))

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/api/applications?job=${selectedJob?._id}`
      )
      setApplications(res.data.data)
    } catch (error: any) {
      message.error(error.message)
    } finally {
      dispatch(setIsLoading(false))
    }
  }

  const onStatusUpdate = async (applicationId: string, status: string) => {
    try {
      dispatch(setIsLoading(true))
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/api/applications/${applicationId}`,
        { status }
      )
      message.success(res.data.message)
      await fetchApplications()
    } catch (error: any) {
      message.error(error.message)
    } finally {
      dispatch(setIsLoading(false))
    }
  }

  React.useEffect(() => {
    fetchApplications()
  }, [])

  const columns = [
    {
      title: "Application ID",
      dataIndex: "_id",
      key: "_id",
      render: (id: string) => <a href={`/applications/${id}`}>{id}</a>,
    },
    {
      title: "Applicant",
      dataIndex: "user",
      key: "user",
      render: (user: any) => user?.name,
    },
    {
      title: "Email",
      dataIndex: "user",
      key: "email",
      render: (user: any) => user?.email,
    },
    {
      title: "Applied On",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: any) => moment(createdAt).format("DD/MM/YYYY"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: any, record: any) => {
        return (
          <Select
            id="status"
            defaultValue={status}
            onChange={async (status) => {
              console.log(status)
              await onStatusUpdate(record._id, status)
            }}
          >
            <Select.Option value="pending">Pending</Select.Option>
            <Select.Option value="shortlisted">Shortlisted</Select.Option>
            <Select.Option value="rejected">Rejected</Select.Option>
          </Select>
        )
      },
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id: any, record: any) => {
        return (
          <div className="flex items-center justify-center gap-2">
            <Tooltip title="Check Applicant">
              <i
                className="ri-eye-line"
                onClick={() =>
                  router.push(
                    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/userinfo/${record.user._id}`
                  )
                }
              />
            </Tooltip>
          </div>
        )
      },
    },
  ]

  return (
    <Modal
      title={`Applications for ${selectedJob?.title}`}
      open={showApplications}
      onCancel={() => setShowApplications(false)}
      onOk={() => setShowApplications(false)}
      width={1000}
    >
      <div className="my-3">
        <Table columns={columns} dataSource={applications} rowKey="_id" />
      </div>
    </Modal>
  )
}
