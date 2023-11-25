"use client"
import React from "react"
import { Row, Form, Input, Col, Button } from "antd"

export default function EmployeeForm() {
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
            <Input type="tel" name="phone" id="phone" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Career Objective" name="careerObjective">
            <Input.TextArea
              rows={4}
              name="careerObjective"
              id="careerObjective"
            />
          </Form.Item>
        </Col>
      </Row>

      {/* Education */}
      <div className="my-5">
        <h1 className="text-xl">Education</h1>
        <Form.List name="education">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => {
                return (
                  <Row key={key} gutter={[16, 16]} align="bottom">
                    <Col span={8} xs={24} sm={24} md={8} lg={8} xl={8}>
                      <Form.Item
                        {...restField}
                        name={[name, "qualification"]}
                        rules={[{ required: true, message: "Required" }]}
                        label="Qualification"
                      >
                        <Input type="text" />
                      </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} md={8} lg={8} xl={8}>
                      <Form.Item
                        {...restField}
                        name={[name, "institution"]}
                        rules={[{ required: true, message: "Required" }]}
                        label="Institution"
                      >
                        <Input type="text" />
                      </Form.Item>
                    </Col>
                    <Col span={5} xs={24} sm={24} md={5} lg={5} xl={5}>
                      <Form.Item
                        {...restField}
                        name={[name, "percentage"]}
                        rules={[{ required: true, message: "Required" }]}
                        label="Percentage"
                      >
                        <Input type="number" />
                      </Form.Item>
                    </Col>
                    <Col
                      span={1}
                      xs={24}
                      sm={24}
                      md={1}
                      lg={1}
                      xl={1}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                      }}
                    >
                      <i
                        className="ri-close-circle-line"
                        onClick={() => remove(name)}
                        style={{
                          textAlign: "center",
                        }}
                      ></i>
                    </Col>
                  </Row>
                )
              })}
              <Form.Item className="my-2">
                <Button type="dashed" onClick={() => add()} block>
                  Add Education
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </div>

      {/* Skills */}
      <div className="my-5">
        <h1 className="text-xl">Skills</h1>
        <Form.List name="skills">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => {
                return (
                  <Row key={key} gutter={[16, 16]} align="bottom">
                    <Col span={8} xs={24} sm={11} md={8} lg={8} xl={8}>
                      <Form.Item
                        {...restField}
                        name={[name, "technology"]}
                        rules={[{ required: true, message: "Required" }]}
                        label="Technology"
                      >
                        <Input type="text" />
                      </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={11} md={8} lg={5} xl={5}>
                      <Form.Item
                        {...restField}
                        name={[name, "rating"]}
                        rules={[{ required: true, message: "Required" }]}
                        label="Rating"
                      >
                        <Input type="text" />
                      </Form.Item>
                    </Col>
                    <Col
                      span={1}
                      xs={24}
                      sm={1}
                      md={1}
                      lg={1}
                      xl={1}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "end",
                        height: "100%",
                      }}
                    >
                      <i
                        className="ri-close-circle-line"
                        onClick={() => remove(name)}
                        style={{
                          textAlign: "center",
                        }}
                      ></i>
                    </Col>
                  </Row>
                )
              })}
              <Form.Item className="my-2">
                <Button type="dashed" onClick={() => add()} block>
                  Add Skill
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </div>

      {/* Experience */}
      <div className="my-5">
        <h1 className="text-xl">Experience</h1>
        <Form.List name="experience">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => {
                return (
                  <Row key={key} gutter={[16, 16]} align="bottom">
                    <Col span={8} xs={24} sm={24} md={8} lg={8} xl={8}>
                      <Form.Item
                        {...restField}
                        name={[name, "company"]}
                        rules={[{ required: true, message: "Required" }]}
                        label="Company"
                      >
                        <Input type="text" />
                      </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} md={8} lg={8} xl={8}>
                      <Form.Item
                        {...restField}
                        name={[name, "role"]}
                        rules={[{ required: true, message: "Required" }]}
                        label="Role"
                      >
                        <Input type="text" />
                      </Form.Item>
                    </Col>
                    <Col span={5} xs={24} sm={24} md={5} lg={5} xl={5}>
                      <Form.Item
                        {...restField}
                        name={[name, "period"]}
                        rules={[{ required: true, message: "Required" }]}
                        label="Period of work"
                      >
                        <Input type="text" />
                      </Form.Item>
                    </Col>
                    <Col
                      span={1}
                      xs={24}
                      sm={24}
                      md={1}
                      lg={1}
                      xl={1}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                      }}
                    >
                      <i
                        className="ri-close-circle-line"
                        onClick={() => remove(name)}
                        style={{
                          textAlign: "center",
                        }}
                      ></i>
                    </Col>
                  </Row>
                )
              })}
              <Form.Item className="my-2">
                <Button type="dashed" onClick={() => add()} block>
                  Add Experience
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </div>
    </>
  )
}
