"use client"
import PageTitle from "@/components/PageTitle"
import { setIsLoading } from "@/redux/loadingsSlice"
import { Button, Modal, Table, message } from "antd"
import axios from "axios"
import moment from "moment"
import { useRouter } from "next/navigation"
import React from "react"
import { useDispatch } from "react-redux"

export default function Jobs() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [jobs, setJobs] = React.useState([])
  const [isModalVisible, setIsModalVisible] = React.useState(false)
  const [currentJobIdToBeDeleted, setCurrentJobIdToDelete] =
    React.useState(null)

  const fetchJobs = async () => {
    try {
      dispatch(setIsLoading(true))

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/api/jobs`
      )
      setJobs(res.data.data)
    } catch (error: any) {
      message.error(error.message)
    } finally {
      dispatch(setIsLoading(false))
    }
  }

  const deleteJob = async (jobid: string) => {
    try {
      dispatch(setIsLoading(true))

      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/api/jobs/${jobid}`
      )

      message.success(res.data.message)
      await fetchJobs()
    } catch (error: any) {
      message.error(error.message)
    } finally {
      dispatch(setIsLoading(false))
    }
  }

  React.useEffect(() => {
    fetchJobs()
  }, [])

  const columns = [
    {
      title: "Job Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Posted On",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => {
        return moment(text).format("DD/MM/YYYY HH:mm:ss")
      },
    },
    {
      title: "Job Type",
      dataIndex: "jobType",
      key: "jobType",
      render: (text: string) => {
        switch (text) {
          case "fullTime":
            return "Full Time"
          case "partTime":
            return "Part Time"
          case "contract":
            return "Contract"
          default:
            return "Unknown"
        }
      },
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Experience",
      dataIndex: "experience",
      key: "experience",
    },
    {
      title: "Work Mode",
      dataIndex: "workMode",
      key: "workMode",
      render: (text: string) => {
        return text.charAt(0).toUpperCase() + text.slice(1)
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text: any, record: any) => {
        console.log(record)
        return (
          <div className="flex gap-3">
            <i
              className="ri-edit-2-line"
              onClick={() => router.push(`/jobs/edit/${record._id}`)}
            ></i>
            <i
              className="ri-delete-bin-line"
              onClick={() => {
                setCurrentJobIdToDelete(record._id)
                setIsModalVisible(true)
              }}
            ></i>
          </div>
        )
      },
    },
  ]

  const handleOk = async () => {
    try {
      await deleteJob(currentJobIdToBeDeleted!)
      setIsModalVisible(false)
      setCurrentJobIdToDelete(null)
    } catch (error: any) {
      console.log(`${error.name}: ${error.message}`)
      message.error(error.message)
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Jobs" />
        <Button type="primary" onClick={() => router.push("/jobs/new")}>
          New Job
        </Button>
      </div>
      <div className="my-3">
        <Table columns={columns} dataSource={jobs} rowKey="_id" />
      </div>

      <Modal
        title="Confirm Delete"
        okText="Delete"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to delete it?</p>
      </Modal>
    </div>
  )
}
