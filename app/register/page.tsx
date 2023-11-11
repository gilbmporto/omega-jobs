"use client"
import React from "react"
import { Form, Button, Radio, message, Input } from "antd"
import Link from "next/link"
import axios from "axios"
import { useDispatch } from "react-redux"
import { setIsLoading } from "@/redux/loadingsSlice"
import { useRouter } from "next/navigation"

export default function Register() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  const onFinish = async (values: any) => {
    try {
      dispatch(setIsLoading(true))

      const res = await axios.post("api/users/register", values)
      message.success(res.data.message)
      router.push("/login")
      try {
        form.resetFields()
      } catch (error) {
        console.log(error)
      }
      //Checking if the fields are empty afterwards
    } catch (err: any) {
      message.error(err.response.data.message)
    } finally {
      dispatch(setIsLoading(false))
    }
  }

  return (
    <div className="flex justify-center h-screen flex-col items-center bg-primary">
      <div className="card p-5 bg-white w-450">
        <h1 className="text-xl my-2">OmegaJobs - Register</h1>
        <hr className="hr" />
        <Form
          layout="vertical"
          className="flex flex-col gap-4"
          onFinish={onFinish}
          form={form}
        >
          <Form.Item label="Register as" name="userType" className="radio">
            <Radio.Group>
              <Radio value="employee">Employee</Radio>
              <Radio value="employer">Employer</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Name" name="name">
            <Input type="text" name="name" id="name" className="input" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" name="email" id="email" className="input" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input
              type="password"
              name="password"
              id="password"
              className="input"
            />
          </Form.Item>
          <Button type="primary" htmlType="submit" block className="my-1">
            Register
          </Button>
          <Link href="/login">Already have an account? Login here!</Link>
        </Form>
      </div>
    </div>
  )
}
