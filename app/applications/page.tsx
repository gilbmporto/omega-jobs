"use client"
import PageTitle from "@/components/PageTitle"
import { setIsLoading } from "@/redux/loadingsSlice"
import { Button, Modal, Table, message } from "antd"
import axios from "axios"
import moment from "moment"
import { useRouter } from "next/navigation"
import React from "react"
import { useDispatch, useSelector } from "react-redux"

export default function Applications() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [applications, setApplications] = React.useState([])
  const [isModalVisible, setIsModalVisible] = React.useState(false)
  const [currentApplicationToDelete, setCurrentApplicationToDelete] =
    React.useState(null)
  const { currentUser } = useSelector((state: any) => state.users)

  const fetchApplications = async () => {
    try {
      dispatch(setIsLoading(true))

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/api/applications?user=${currentUser?._id}`
      )
      setApplications(res.data.data)
    } catch (error: any) {
      message.error(error.message)
    } finally {
      dispatch(setIsLoading(false))
    }
  }

  React.useEffect(() => {
    fetchApplications()
  }, [])

  console.log(applications)

  const columns = [
    {
      title: "Application ID",
      dataIndex: "_id",
      key: "_id",
      render: (id: string) => <a href={`/applications/${id}`}>{id}</a>,
    },
    {
      title: "Job Title",
      dataIndex: "job",
      key: "job",
      render: (job: any) => job?.title,
    },
    {
      title: "Company",
      dataIndex: "job",
      key: "company",
      render: (job: any) => job?.user?.name,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: any) => {
        return text.charAt(0).toUpperCase() + text.slice(1)
      },
    },
    {
      title: "Applied On",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: any) => moment(createdAt).format("DD/MM/YYYY"),
    },
  ]

  const handleOk = async () => {
    try {
      setIsModalVisible(false)
      setCurrentApplicationToDelete(null)
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
        <PageTitle title="Applications" />
      </div>
      <div className="my-3">
        <Table columns={columns} dataSource={applications} rowKey="_id" />
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
