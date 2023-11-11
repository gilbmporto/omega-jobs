"use client"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, Form, message } from "antd"
import EmployerForm from "@/components/EmployerForm"
import EmployeeForm from "@/components/EmployeeForm"
import PageTitle from "@/components/PageTitle"
import { setIsLoading } from "@/redux/loadingsSlice"
import axios from "axios"
import { setCurrentUser } from "@/redux/usersSlice"

export default function Profile() {
  const { currentUser } = useSelector((state: any) => state.users)
  const dispatch = useDispatch()

  const [form] = Form.useForm()

  const onFinish = async (values: any) => {
    try {
      // Set the values correctly
      values._id = currentUser._id
      values.userType = currentUser.userType

      dispatch(setIsLoading(true))

      const response = await axios.put(`/api/users`, values)
      console.log(response.data.data)
      dispatch(setCurrentUser(response.data.data))
      message.success(response.data.message)
    } catch (error: any) {
      console.log(error)
      message.error(error.response.data.message)
    } finally {
      dispatch(setIsLoading(false))
    }
  }

  return (
    <div>
      <PageTitle title="Profile" />
      <Form
        layout="vertical"
        form={form}
        initialValues={currentUser}
        onFinish={onFinish}
      >
        {currentUser?.userType === "employer" ? (
          <EmployerForm />
        ) : (
          <EmployeeForm />
        )}
        <Form.Item className="py-2 my-2 flex justify-end">
          <Button
            type="primary"
            htmlType="submit"
            className="flex items-center"
          >
            Save <i className="ri-save-line save-icon"></i>
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
