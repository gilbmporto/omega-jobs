"use client"
import React from "react"
import { Col, Form, Input, Row, Select } from "antd"

export default function JobPostForm() {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Form.Item
          label="Job Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please enter a job title",
            },
          ]}
        >
          <Input type="text" />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item
          label="Job Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please enter a job description",
            },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Col>

      <Col span={8} xs={24} sm={12} md={8} lg={8} xl={8}>
        <Form.Item
          label="Job Type"
          name="jobType"
          rules={[
            {
              required: true,
              message: "Please enter a job type",
            },
          ]}
        >
          <Select style={{ height: "45px" }}>
            <Select.Option value="fullTime">Full Time</Select.Option>
            <Select.Option value="partTime">Part Time</Select.Option>
            <Select.Option value="contract">Contract</Select.Option>
          </Select>
        </Form.Item>
      </Col>

      <Col span={8} xs={24} sm={12} md={8} lg={8} xl={8}>
        <Form.Item
          label="Job Location"
          name="location"
          rules={[
            {
              required: true,
              message: "Please enter the job location",
            },
          ]}
        >
          <Select
            id="location"
            style={{
              height: "44px",
              width: "100%",
              overflowY: "auto",
            }}
            defaultValue={"USA"}
          >
            <Select.Option value="India">India</Select.Option>
            <Select.Option value="USA">USA</Select.Option>
            <Select.Option value="UK">UK</Select.Option>
            <Select.Option value="Canada">Canada</Select.Option>
            <Select.Option value="Bra">Brazil</Select.Option>
            <Select.Option value="Spain">Spain</Select.Option>
            <Select.Option value="Portugal">Portugal</Select.Option>
            <Select.Option value="France">France</Select.Option>
            <Select.Option value="Germany">Germany</Select.Option>
          </Select>
        </Form.Item>
      </Col>

      <Col span={8} xs={24} sm={12} md={8} lg={8} xl={8}>
        <Form.Item
          label="Experience"
          name="experience"
          rules={[
            {
              required: true,
              message: "Please enter the experience",
            },
          ]}
        >
          <Input type="text" />
        </Form.Item>
      </Col>

      <Col span={8} xs={24} sm={12} md={8} lg={8} xl={8}>
        <Form.Item
          label="Work Mode"
          name="workMode"
          rules={[
            {
              required: true,
              message: "Please enter the work mode",
            },
          ]}
        >
          <Select style={{ height: "45px" }}>
            <Select.Option value="remote">Remote</Select.Option>
            <Select.Option value="office">Office</Select.Option>
          </Select>
        </Form.Item>
      </Col>

      <Col span={8} xs={24} sm={12} md={8} lg={8} xl={8}>
        <Form.Item
          label="Salary From Range"
          name="salaryFromRange"
          rules={[
            {
              required: true,
              message: "Please enter the salary from range",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
      </Col>

      <Col span={8} xs={24} sm={12} md={8} lg={8} xl={8}>
        <Form.Item
          label="Salary To Range"
          name="salaryToRange"
          rules={[
            {
              required: true,
              message: "Please enter the salary to range",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
      </Col>
    </Row>
  )
}
