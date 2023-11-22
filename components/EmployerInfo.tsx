import { Card, Col, Row } from "antd"
import React from "react"

export default function EmployerInfo({ userInfo }: { userInfo: any }) {
  return (
    userInfo && (
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card bordered={true} style={{ width: "100%", minWidth: "360px" }}>
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

              {userInfo.website && (
                <div className="flex justify-between gap-2 items-center">
                  <span>
                    <strong>Website:</strong>
                  </span>{" "}
                  <span>{userInfo.website}</span>
                </div>
              )}

              {userInfo.address && (
                <div className="flex justify-between gap-2 items-center">
                  <span>
                    <strong>Address:</strong>
                  </span>{" "}
                  <span>{userInfo.address}</span>
                </div>
              )}

              {userInfo.establishmentYear && (
                <div className="flex justify-between gap-2 items-center">
                  <span>
                    <strong>Establishment Year:</strong>
                  </span>{" "}
                  <span>{userInfo.establishmentYear}</span>
                </div>
              )}

              {userInfo.companySize && (
                <div className="flex justify-between gap-2 items-center">
                  <span>
                    <strong>Company Size:</strong>
                  </span>{" "}
                  <span>{userInfo.companySize} employers</span>
                </div>
              )}

              <hr />

              {userInfo.about && (
                <div className="flex justify-between gap-2 items-center">
                  <span>
                    <strong>About:</strong>
                  </span>{" "}
                  <span>{userInfo.about}</span>
                </div>
              )}
            </div>
          </Card>
        </Col>
      </Row>
    )
  )
}
