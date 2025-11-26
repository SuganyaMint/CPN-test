import React, { useEffect, useState } from "react";
import { Table, Tag, Input } from "antd";
import { Link } from "react-router-dom";
import { ApiRouter } from "../utils/ApiRouter";
import API from "../utils/ApiUrl";
import LOADING from "../assets/venine_loading.gif";
import Highlighter from "react-highlight-words";

export default function ComplaintPage() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get(ApiRouter.complaint);
      if (res.data.status === true) {
        const itemsWithImages = await Promise.all(
          res.data.data.map(async (item) => {
            try {
              const imageRes = await API.post(
                ApiRouter.complaintImage,
                { filename: item.attachments_path },
                { responseType: "arraybuffer" }
              );
              const contentType = imageRes.headers["content-type"];
              let blobType = "";

              if (
                contentType.includes("image/jpeg") ||
                contentType.includes("image/png") ||
                contentType.includes("application/pdf")
              ) {
                blobType = contentType;
              } else {
                throw new Error("Unsupported file type");
              }

              const blob = new Blob([imageRes.data], { type: blobType });
              const imageUrl = URL.createObjectURL(blob);

              return {
                ...item,
                img: imageUrl,
                key: item.id,
              };
            } catch (error) {
              console.error("Error fetching image:", error);
              return item;
            }
          })
        );
        setData(itemsWithImages);
      }
    };
    fetchData();
  }, []);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    if (!searchText) {
      setFilteredData(data);
    } else {
      const lower = searchText.toLowerCase();
      const filtered = data.filter((item) =>
        Object.values(item).some(
          (val) => typeof val === "string" && val.toLowerCase().includes(lower)
        )
      );
      setFilteredData(filtered);
    }
  }, [searchText, data]);
  const highlight = (text) => (
    <Highlighter
      highlightStyle={{ backgroundColor: "#96c9ff", padding: 0 }}
      searchWords={[searchText]}
      autoEscape
      textToHighlight={text?.toString() || ""}
    />
  );

  const columns = [
    {
      title: "หมายเลขเอกสาร",
      dataIndex: "complaint_id",
      key: "complaint_id",
      align: "center",
      sorter: (a, b) => a.complaint_id.localeCompare(b.complaint_id),
      render: (text) => highlight(text),
    },
    {
      title: "ผู้ร้องเรียน",
      dataIndex: "complaint_by",
      key: "complaint_by",
      align: "center",
      render: (text) => highlight(text),
      sorter: (a, b) => a.complaint_by.localeCompare(b.complaint_by),
    },
    {
      title: "ฝ่ายผู้ร้องเรียน",
      dataIndex: "complaint_section",
      key: "complaint_section",
      align: "center",
      render: (text) => highlight(text),
      sorter: (a, b) => a.complaint_section.localeCompare(b.complaint_section),
    },
    {
      title: "ประเภทการร้องขอ",
      dataIndex: "complaint_type",
      key: "complaint_type",
      align: "center",
      render: (text) => highlight(text),
      sorter: (a, b) => a.complaint_type.localeCompare(b.complaint_type),
    },

    {
      title: "ที่อยู่(กรณีร้องเรียนจากภายนอก)",
      dataIndex: "address",
      key: "address",
      render: (text) => highlight(text),
      align: "center",
    },
    {
      title: "เบอร์โทรศัพท์",
      dataIndex: "phone",
      key: "phone",
      render: (text) => highlight(text),
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => highlight(text),
      align: "center",
    },

    {
      title: "เรื่องที่ร้องเรียน",
      dataIndex: "title",
      key: "title",
      render: (text) => highlight(text),
      align: "center",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: <div style={{ textAlign: "center" }}>รายละเอียด</div>,
      dataIndex: "detail",
      key: "detail",
      width: 350,
      render: (text) => highlight(text),
    },
    {
      title: "ผู้ถูกร้องเรียน",
      dataIndex: "complaint_to",
      key: "complaint_to",
      render: (text) => highlight(text),
      align: "center",
    },
    {
      title: "ฝ่ายที่ถูกร้องเรียน",
      dataIndex: "complaint_to_section",
      key: "complaint_to_section",
      align: "center",
      render: (text) => highlight(text),
      sorter: (a, b) =>
        a.complaint_to_section.localeCompare(b.complaint_to_section),
    },

    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (text) => {
        let color = "error";

        if (text === "เข้าสู่ระบบ" || text === "รับเรื่องร้องเรียน") {
          color = "warning";
        } else if (
          text === "แก้ไขสำเร็จ" ||
          text === "ปิดได้" ||
          text === "อนุมัติให้แก้ไข"
        ) {
          color = "success";
        }

        return <Tag color={color}>{highlight(text)}</Tag>;
      },
    },

    {
      title: "เอกสารแนบ",
      align: "center",
      render: (record) => (
        <div>
          <a
            style={{
              color: "blue",
              cursor: "pointer",
            }}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.open(record.img, "_blank");
            }}
          >
            ดูเอกสาร
          </a>
        </div>
      ),
    },
    {
      title: "ใบร้องเรียน",
      align: "center",
      // req_status
      render: (record) => (
        <div>
          <Link to={`/form-complaint/${record.complaint_id}`}>
            <p
              style={{
                color: "blue",
                cursor: "pointer",
              }}
            >
              ดูใบร้องเรียน
            </p>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div
        style={{
          // display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "20px",
        }}
      >
        <p
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            textAlign: "center",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          รายการใบร้องเรียน
        </p>
      </div>

      {data.length === 0 ? (
        <img
          src={LOADING}
          alt="Loading..."
          style={{
            display: "block",
            margin: "0 auto",
            width: "100%",
            height: "100%",
          }}
        />
      ) : (
        <div>
          <p>พิมพ์ Keyword เพื่อค้นหา</p>
          <Input
            placeholder="Keyword Search"
            style={{ marginBottom: 16, width: 200, marginTop: "10px" }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Table
            // dataSource={data}
            dataSource={filteredData}
            columns={columns}
            rowKey={(record) => record.id}
            pagination={{ pageSize: 20 }}
            scroll={{ x: 2500 }}
          />
        </div>
      )}
    </div>
  );
}
