import { Card, Col, Row } from "antd"
import React from "react"

export default function EmployerInfo({ userInfo }: { userInfo: any }) {
  console.log(userInfo.phone)

  return (
    userInfo && (
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card bordered={true}>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <h3>
                  <strong>Company Name:</strong>
                </h3>{" "}
                <span
                  style={{
                    fontSize: "18px",
                  }}
                >
                  {userInfo.name}
                </span>
              </div>

              <hr className="my-2" />

              <div className="flex justify-between items-center">
                <span>
                  <strong>Email:</strong>
                </span>{" "}
                <span>{userInfo.email}</span>
              </div>

              {userInfo.phone && (
                <div className="flex justify-between gap-2 items-center">
                  <span>
                    <strong>Phone:</strong>
                  </span>{" "}
                  <span>{userInfo.phone}</span>
                </div>
              )}
            </div>
          </Card>
        </Col>
      </Row>
    )
  )
}
