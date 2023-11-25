"use client"
import { Col, Form, Input, Row } from "antd"
import React from "react"

export default function EmployerForm() {
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={8} xs={24} sm={12} md={8} lg={8} xl={8}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Required" }]}
          >
            <Input type="text" name="name" id="name" />
          </Form.Item>
        </Col>

        <Col span={8} xs={24} sm={12} md={8} lg={8} xl={8}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Required" }]}
          >
            <Input type="email" name="email" id="email" />
          </Form.Item>
        </Col>

        <Col span={8} xs={24} sm={12} md={8} lg={8} xl={8}>
          <Form.Item label="Phone" name="phone">
            <Input type="number" name="phone" id="phone" />
          </Form.Item>
        </Col>

        <Col span={8} xs={24} sm={12} md={8} lg={8} xl={8}>
          <Form.Item label="Est Year" name="establishmentYear">
            <Input
              type="number"
              name="establishmentYear"
              id="establishmentYear"
            />
          </Form.Item>
        </Col>

        <Col span={8} xs={24} sm={12} md={8} lg={8} xl={8}>
          <Form.Item label="Website" name="website">
            <Input type="text" name="website" id="website" />
          </Form.Item>
        </Col>

        <Col span={8} xs={24} sm={12} md={8} lg={8} xl={8}>
          <Form.Item label="No of Employees" name="companySize">
            <Input type="number" name="companySize" id="companySize" />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item label="About" name="about">
            <Input.TextArea name="about" id="about" rows={4} />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item label="Address" name="address">
            <Input.TextArea name="address" id="address" rows={4} />
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}
