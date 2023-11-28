"use client"
import { Button, Col, Input, Row, Select } from "antd"
import React from "react"

export default function Filters({
  filters,
  setFilters,
  getData,
}: {
  filters: any
  setFilters: any
  getData: any
}) {
  console.log(filters)

  return (
    <Row gutter={[16, 16]} className="flex items-end my-2">
      <Col
        span={8}
        xs={24}
        sm={12}
        md={8}
        lg={8}
        xl={8}
        className="flex flex-col gap-1"
      >
        <span>Search Jobs</span>
        <Input
          title="Search Jobs"
          type="text"
          value={filters?.searchText}
          placeholder="Search jobs..."
          onChange={(e) =>
            setFilters({ ...filters, searchText: e.target.value })
          }
        />
      </Col>

      <Col
        span={8}
        xs={24}
        sm={12}
        md={8}
        lg={8}
        xl={8}
        className="flex flex-col gap-1"
      >
        <span>Location</span>
        <Select
          title="Location"
          style={{
            height: "44px",
            width: "100%",
            minWidth: "150px",
            overflowY: "auto",
          }}
          value={filters?.location}
          onChange={(value) => setFilters({ ...filters, location: value })}
        >
          <Select.Option value="">All</Select.Option>
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
      </Col>

      <Col
        span={4}
        xs={24}
        sm={4}
        md={4}
        lg={4}
        xl={4}
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Button type="primary" onClick={getData}>
          Search
        </Button>
      </Col>
    </Row>
  )
}
