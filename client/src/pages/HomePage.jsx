import React, { useState, useEffect } from "react";
import { Card, Col, Row } from "antd";
import { ApiRouter } from "../utils/ApiRouter";
import API from "../utils/ApiUrl";
import logo from "../assets/logo-venine.png";
import { DatePicker } from "antd";
import moment from "moment";
import dayjs from "dayjs";

function HomePage() {
  const [allData, setAllData] = useState([]); //ทั้งหมด
  const [staus1, setStatus1] = useState([]); //รอการตรวจสอบ
  const [staus2, setStatus2] = useState([]); //กำลังดำเนินการ
  const [staus3, setStatus3] = useState([]); // เสร็จสิ้นการดำเนินการ
  const [staus4, setStatus4] = useState([]); // เสร็จสิ้นการดำเนินการ

  const thisYear = new Date().getFullYear();
  let thisMonth = new Date().getMonth() + 1;
  if (thisMonth < 10) {
    thisMonth = `0${thisMonth}`;
  }
  const defaultMonth = `${thisYear}-${thisMonth}`;

  const monthFormat = "YYYY-MM";

  useEffect(() => {
    const fechData = async () => {
      const res = await API.get(ApiRouter.statusLength + "/" + defaultMonth);
      let getData = res.data.data;
      setAllData(getData.all);
      setStatus1(getData.status1);
      setStatus2(getData.status2);
      setStatus3(getData.status3);
      setStatus4(getData.status4);
    };
    fechData();
  }, []);
  const handleChange = async (date, dateString) => {
    const res = await API.get(ApiRouter.statusLength + "/" + dateString);
    let getData = res.data.data;
    setAllData(getData.all);
    setStatus1(getData.status1);
    setStatus2(getData.status2);
    setStatus3(getData.status3);
    setStatus4(getData.status4);
  };


  return (
    <>
      <div
        style={{
          //กึ่งกลาง
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          style={{
            width: "100px",
            height: "auto",
          }}
          src={logo}
        />
        <p
          style={{
            fontSize: "30px",
            fontWeight: "bold",
            textAlign: "center",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          รายงานสรุปคำร้องข้อร้องเรียน
        </p>
        <DatePicker
          defaultValue={dayjs(defaultMonth, monthFormat)}
          format={monthFormat}
          picker="month"
          onChange={handleChange}
          style={{ marginBottom: "20px" }}
        />
        <div className="stats shadow mb-6">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">ทั้งหมด</div>
            <div className="stat-value">{allData}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                ></path>
              </svg>
            </div>
            <div className="stat-title">สำเร็จ</div>

            <div className="stat-value " style={{ color: "#1EB530" }}>
              {staus4}
            </div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                ></path>
              </svg>
            </div>
            <div className="stat-title">เข้าสู่ระบบ</div>
            <div className="stat-value" style={{ color: "#FFB233" }}>
              {allData - staus4}
            </div>
          </div>
        </div>{" "}
      </div>
      <div></div>
      <Row gutter={16}>
        <Col span={6}>
          <Card
            title="รอการตรวจสอบ"
            bordered={false}
            style={{ textAlign: "center" }}
          >
            <p
              style={{
                fontSize: "30px",
                fontWeight: "bold",
                textAlign: "center",
                marginTop: "5px",
                marginBottom: "5px",
                //สีแดง
                color: "#FF3838",
              }}
            >
              {staus1}
            </p>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title="กำลังดำเนินการ"
            bordered={false}
            style={{ textAlign: "center" }}
          >
            <p
              style={{
                fontSize: "30px",
                fontWeight: "bold",
                textAlign: "center",
                marginTop: "5px",
                marginBottom: "5px",
                color: "#FFB233",
              }}
            >
              {staus2}
            </p>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title="ไม่อนุมัติคำร้อง"
            bordered={false}
            style={{ textAlign: "center" }}
          >
            <p
              style={{
                fontSize: "30px",
                fontWeight: "bold",
                textAlign: "center",
                marginTop: "5px",
                marginBottom: "5px",
                color: "#FF3838",
              }}
            >
              {staus3}
            </p>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title="เสร็จสิ้นการดำเนินการ (close job)"
            bordered={false}
            style={{ textAlign: "center" }}
          >
            <p
              style={{
                fontSize: "30px",
                fontWeight: "bold",
                textAlign: "center",
                marginTop: "5px",
                marginBottom: "5px",
                color: "#1EB530",
              }}
            >
              {staus4}
            </p>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default HomePage;
