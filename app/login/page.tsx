"use client"
import React from "react"
import { Button, Form, Radio, message, Input } from "antd"
import Link from "next/link"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { setIsLoading } from "@/redux/loadingsSlice"

function Login() {
  const dispatch = useDispatch()
  const router = useRouter()

  const onFinish = async (values: any) => {
    try {
      dispatch(setIsLoading(true))
      const res = await axios.post("api/users/login", values)
      message.success(res.data.message)
      router.push("/")
    } catch (err: any) {
      message.error(err.response.data.message)
    } finally {
      dispatch(setIsLoading(false))
    }
  }

  return (
    <div className="flex justify-center h-screen flex-col items-center bg-primary">
      <div className="card p-5 bg-white w-450">
        <h1 className="text-xl my-2">OmegaJobs - Login</h1>
        <hr className="hr" />
        <Form
          layout="vertical"
          className="flex flex-col gap-5"
          onFinish={onFinish}
        >
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
            Login
          </Button>
          <Link href="/register">Don't have an account? Register here!</Link>
        </Form>
      </div>
    </div>
  )
}

export default Login
