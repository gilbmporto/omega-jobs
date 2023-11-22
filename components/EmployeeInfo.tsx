import { Card, Col, Row, Table } from "antd"
import React from "react"

export default function EmployeeInfo({ userInfo }: { userInfo: any }) {
  console.log(userInfo)
  console.log(userInfo.skills)

  return (
    userInfo && (
      <Row gutter={[16, 16]}>
        <Col span={16}>
          <Card bordered={true} style={{ width: "100%", minWidth: "360px" }}>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <h3>
                  <strong>Employee Name:</strong>
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

              <hr />

              {userInfo.careerObjective && (
                <div className="flex justify-between gap-2 items-center">
                  <span
                    style={{
                      minWidth: "150px",
                    }}
                  >
                    <strong>Career Objective:</strong>
                  </span>{" "}
                  <span>{userInfo.careerObjective}</span>
                </div>
              )}
            </div>

            <hr className="my-2" />

            {userInfo.skills.length > 0 ? (
              <div className="flex justify-between gap-3 items-center">
                <span>
                  <strong>Skills:</strong>
                </span>{" "}
                <Table
                  dataSource={userInfo.skills}
                  rowKey="_id"
                  style={{
                    width: "100%",
                    minWidth: "200px",
                  }}
                  className="custom-table-header"
                  bordered={true}
                  pagination={false}
                  columns={[
                    {
                      title: "Technology",
                      dataIndex: "technology",
                      key: "technology",
                      align: "center",
                    },
                    {
                      title: "Rating (Out of 10)",
                      dataIndex: "rating",
                      key: "rating",
                      align: "center",
                    },
                  ]}
                />
              </div>
            ) : null}

            <hr className="my-2" />

            {userInfo.education.length > 0 ? (
              <div className="flex justify-between gap-3 items-center">
                <span>
                  <strong>Education:</strong>
                </span>{" "}
                <Table
                  dataSource={userInfo.education}
                  rowKey="_id"
                  style={{
                    width: "100%",
                    minWidth: "200px",
                    overflowX: "auto",
                  }}
                  className="custom-table-header"
                  bordered={true}
                  pagination={false}
                  columns={[
                    {
                      title: "Institution",
                      dataIndex: "institution",
                      key: "institution",
                      align: "center",
                    },
                    {
                      title: "Percentage",
                      dataIndex: "percentage",
                      key: "percentage",
                      align: "center",
                    },
                    {
                      title: "Qualification",
                      dataIndex: "qualification",
                      key: "qualification",
                      align: "center",
                    },
                  ]}
                />
              </div>
            ) : null}

            <hr className="my-2" />

            {userInfo.experience.length > 0 ? (
              <div className="flex justify-between gap-3 items-center">
                <span>
                  <strong>Experience:</strong>
                </span>{" "}
                <Table
                  dataSource={userInfo.experience}
                  rowKey="_id"
                  style={{
                    width: "100%",
                    minWidth: "200px",
                    overflowX: "auto",
                  }}
                  className="custom-table-header"
                  bordered={true}
                  pagination={false}
                  columns={[
                    {
                      title: "Company",
                      dataIndex: "company",
                      key: "company",
                      align: "center",
                    },
                    {
                      title: "Role",
                      dataIndex: "role",
                      key: "role",
                      align: "center",
                    },
                    {
                      title: "Period of Work",
                      dataIndex: "period",
                      key: "period",
                      align: "center",
                    },
                  ]}
                />
              </div>
            ) : null}
          </Card>
        </Col>
      </Row>
    )
  )
}
