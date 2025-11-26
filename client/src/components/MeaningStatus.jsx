import React, { useState } from "react";
import { Button, Modal } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

export default function MeaningStatus() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  let status = [
    {
      title: "รอรับแจ้งคำร้อง",
      description: "รอแผนกธุรการรับแจ้ง",
    },
    {
      title: "รอการตรวจสอบ",
      description: "รอแผนกธุรการตรวจสอบ",
    },
    {
      title: "อนุมัติจากผู้ตรวจสอบ",
      description: "อนุมัติจากผู้ตรวจสอบแผนกธุรการแล้ว",
    },
    {
      title: "ไม่อนุมัติจากผู้ตรวจสอบ",
      description: "ถูกปฏิเสธใบร้องขอจากผู้ตรวจสอบแผนกธุรการ",
    },
    {
      title: "เรียบร้อย",
      description:
        'เสร็จสิ้นการดำเนินการตามใบร้องขอ และได้รับการตรวจสอบแล้วว่า "เรียบร้อย"',
    },
    {
      title: "ไม่เรียบร้อย",
      description:
        'เสร็จสิ้นการดำเนินการตามใบร้องขอ แต่ได้รับการตรวจสอบแล้วว่า "ไม่เรียบร้อย"',
    },
    {
      title: "ยกเลิก",
      description: "ผู้แจ้งร้องขอดำเนินการยกเลิกการดำเนินการ",
    },
  ];
  return (
    <>
      <QuestionCircleOutlined
        onClick={showModal}
        style={{
          fontSize: "20px",
          color: "#1890ff",
          cursor: "pointer",
          marginLeft: "10px",
          left: "0",
        }}
      />
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        // footer={null}
      >
        <p
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            textAlign: "center",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          ความหมายของสถานะใบดำเนินการ
        </p>

        {status.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                width: "40%",
                height: "auto",
                border: "1px solid black",
                padding: "10px",
              }}
            >
              {item.title}
            </div>
            <div
              style={{
                width: "60%",
                height: "auto",
                border: "1px solid black",
                padding: "10px",
              }}
            >
              {item.description}
            </div>
          </div>
        ))}
      </Modal>
    </>
  );
}
