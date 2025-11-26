import React, { useState, useRef, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import API from "../../utils/ApiUrl";
import { ApiRouter } from "../../utils/ApiRouter";
import Swal from "sweetalert2";
import SkeletonComponent from "../SkeletonComponent/SkeletonComponent";
import { Button, Divider } from "antd";
import { formatCountdown } from "antd/es/statistic/utils";

export default function ComplaintCreate(props) {
  let complaintOldData = props.complaint;
  let complaint_id = "";
  let type = "";
  if (props.complaint_id) {
    complaint_id = props.complaint_id;
    type = complaintOldData[0].complaint_type;
  } else {
    complaint_id = "create";
    type = "ภายใน";
  }
  const user = localStorage.getItem("FullName");
  const section = localStorage.getItem("Section");

  const [signatureData, setSignatureData] = useState(null);
  const [signatureBlob, setSignatureBlob] = useState(null);
  const signatureRef = useRef(); // สร้าง ref สำหรับ SignatureCanvas

  const [selectedOption, setSelectedOption] = useState(type); // default value

  const [file, setFile] = useState(null);
  const [oldData, setOldData] = useState([]); // สร้าง state สำหรับเก็บข้อมูลเดิมที่เราดึงมาจาก API

  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sectionOp, setSectionOp] = useState([]);
  const [kpi, setKpi] = useState([]);
  const [kpi_section, setKpiSection] = useState([]);
  const [orginalKpi, setOrginalKpi] = useState([]);
  // console.log(orginalKpi)
  useEffect(() => {
    const fetchData = async () => {
      const getAllSection = await API.get(ApiRouter.section);
      const getKpi = await API.get(ApiRouter.kpi);
      const kpiData = getKpi.data.data;
      setOrginalKpi(kpiData);
      let kpiOp = [];
      kpiData.map((item) => {
        kpiOp.push({
          key: item.id,
          value: `${item.kpi_title} - ${item.kpi_section}`,
        });
      });
      // kpiOp.push({
      //   key: "อื่นๆ",
      //   value: "อื่นๆ",
      // });

      setKpi(kpiOp);

      setSectionOp(getAllSection.data.data);
      if (complaint_id !== "create") {
        try {
          const res = await API.get(`${ApiRouter.complaint}/${complaint_id}`);

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
            setOldData(itemsWithImages);
          }

          setDisabled(true);
        } catch (error) {
          console.error("Error fetching data", error);
        }
        setLoading(false);
      } else if (complaint_id === "create") {
        setLoading(false);
      }
    };

    if (oldData.length === 0 && complaint_id) {
      fetchData();
    }
  }, [complaint_id, oldData.length]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleChangeKpi = (event) => {
    let data = event.target.value;
    orginalKpi.map((item) => {
      if (parseInt(item.id) == parseInt(data)) {
        setKpiSection(item.kpi_section);
      }
    });
  };
  const handleSubmit = async (e) => {
    event.preventDefault(); // Prevent the default form submission
    const data = {};

    const formData = new FormData(e.target);
    formData.forEach((value, key) => {
      data[key] = value;
    });
    if (file.size > 5 * 1024 * 1024) {
      // Check if file size exceeds 20MB
      Swal.fire({
        icon: "error",
        title: "ขนาดไฟล์เกิน 20 MB",
        text: "กรุณาเลือกไฟล์ที่มีขนาดไม่เกิน 20 MB",
      });
      return; // Stop the form submission
    }

    data.file = file;
    data.complaint_type = selectedOption;
    data.sign_create_complaint = signatureData;
    data.complaint_by = user;
    data.complaint_section = section;
    data.complaint_to_section = kpi_section;

    Swal.fire({
      icon: "question",
      title: "คุณต้องการส่งใบดำเนินการใช่ไหม?",
      showDenyButton: true,
      confirmButtonText: "ใช่",
      denyButtonText: `ไม่ใช่`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const res = await API.post(ApiRouter.complaint, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (res.data.status === true) {
          setDisabled(true);
          Swal.fire("Saved!", "", "success");
          //link to request page after submit 3 second
          setTimeout(() => {
            window.location.href = "/complaint";
          }, 3000);
        }
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const handleSaveSignature = () => {
    if (signatureRef.current) {
      const signatureDataUrl = signatureRef.current.toDataURL();
      fetch(signatureDataUrl)
        .then((res) => res.blob())
        .then((blob) => {
          setSignatureBlob(blob);
        })
        .catch((error) => {
          console.error(
            "เกิดข้อผิดพลาดในการดึงข้อมูลลายเซ็นเจอร์เป็น Blob",
            error
          );
        });
    }
  };
  const handleReset = () => {
    signatureRef.current.clear(); // Clear the content of the SignatureCanvas
    setSignatureData(null); // Reset the signature data
  };

  return (
    <>
      {loading ? (
        <>
          <SkeletonComponent />
        </>
      ) : (
        <>
          <div>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
              <div className="rounded-t bg-white mb-0 px-6 py-6">
                <div className="text-center flex justify-between">
                  <h6 className="text-gray-700 text-xl font-bold">
                    {complaint_id == "create"
                      ? " กรอกรายละเอียดสำหรับผู้ร้องเรียน"
                      : "รายละเอียดผู้ร้องเรียน"}
                  </h6>

                  {complaint_id == "create" ? (
                    <a
                      href="https://ncr-systems.veninecopper.com/"
                      target="_blank"
                    >
                      <button className="btn btn-info hover:bg-indigo-50 hover:text-black">
                        ร้องเรียนเกี่ยวกับ NCR
                      </button>
                    </a>
                  ) : null}
                </div>
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0 ">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-wrap mt-6">
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-600 font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          ชื่อผู้ร้องเรียน
                        </label>

                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="ชื่อผู้ร้องเรียน"
                          name="req_by"
                          defaultValue={
                            complaint_id === "create"
                              ? user
                              : oldData[0].complaint_by
                          }
                          disabled={true}
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-600 font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          แผนกผู้ร้องเรียน
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="แผนก"
                          name="req_by_section"
                          defaultValue={
                            complaint_id === "create"
                              ? section
                              : oldData[0].complaint_section
                          }
                          disabled={true}
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-600 font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          E-mail ผู้ร้องเรียน
                        </label>

                        <input
                          type="email"
                          className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder=" E-mail ผู้ร้องเรียน"
                          name="email"
                          defaultValue={
                            complaint_id === "create" ? null : oldData[0].email
                          }
                          disabled={disabled}
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-600 font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          เบอรโทรผู้ร้องเรียน
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="เบอร์โทรผู้ร้องเรียน"
                          name="phone"
                          defaultValue={
                            complaint_id === "create" ? null : oldData[0].phone
                          }
                          disabled={disabled}
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label className="block uppercase text-gray-600 font-bold mb-2">
                          ประเภทการร้องเรียน
                        </label>
                        <div className="mb-6">
                          <div className="ml-6 flex items-center">
                            <input
                              type="radio"
                              value="ภายใน"
                              checked={selectedOption === "ภายใน"}
                              onChange={handleChange}
                              className="radio radio-info mr-2"
                              name="req_type"
                              disabled={disabled}
                            />
                            <span className="label-text text-gray-600">
                              ร้องเรียนภายใน
                            </span>
                          </div>
                          <div className="ml-6 flex items-center mt-2">
                            <input
                              type="radio"
                              value="ภายนอก"
                              checked={selectedOption === "ภายนอก"}
                              onChange={handleChange}
                              className="radio radio-info mr-2"
                              name="complaint_type"
                              disabled={disabled}
                            />
                            <span className="label-text text-gray-600">
                              ร้องเรียนภายนอก
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {selectedOption === "ภายนอก" ? (
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-gray-600 font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            ที่อยู่ (กรณีลูกค้าภายนอกร้องเรียน)
                          </label>
                          <textarea
                            className="textarea textarea-bordered px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="ที่อยู่ (กรณีลูกค้าภายนอกร้องเรียน)"
                            name="address"
                            style={{ height: "100px" }}
                            disabled={disabled}
                            defaultValue={
                              oldData.length === 0 ? "" : oldData[0].address
                            }
                          ></textarea>
                        </div>
                      </div>
                    ) : null}
                    <Divider
                      style={{
                        backgroundColor: "#D0D0D0",
                        height: "1px",
                      }}
                    />
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-600 font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          ชื่อผู้ถูกร้องเรียน
                        </label>

                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="ชื่อผู้ถูกร้องเรียน"
                          name="complaint_to"
                          defaultValue={
                            complaint_id === "create"
                              ? null
                              : oldData[0].complaint_to
                          }
                          disabled={disabled}
                        />
                      </div>
                    </div>

                    {oldData.length === 0 ? (
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-gray-600 font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            แผนกผู้ถูกร้องเรียน (Auto generate)
                          </label>

                          <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            name="req_by_section"
                            defaultValue={kpi_section}
                            disabled={true}
                          />

                          {/* <select
                            className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            name="complaint_to_section"
                            defaultValue=""
                          >
                            <option value="" disabled>
                              แผนกผู้ถูกร้องเรียน
                            </option>
                            {sectionOp.map((option, index) => (
                              <option key={index} value={option.section}>
                                {option.section} - {option.name}
                              </option>
                            ))}
                          </select> */}
                        </div>
                      </div>
                    ) : (
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-gray-600 font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            แผนกผู้ถูกร้องเรียน
                          </label>
                          <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="แผนกผู้ถูกร้องเรียน"
                            name="complaint_to_section"
                            defaultValue={
                              complaint_id === "create"
                                ? null
                                : oldData[0].complaint_to_section
                            }
                            disabled={disabled}
                          />
                        </div>
                      </div>
                    )}

                    <div className="w-full lg:w-12/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-600 font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          เรื่องที่ต้องการร้องเรียน
                        </label>

                        {oldData.length === 0 ? (
                          <select
                            className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            name="kpi"
                            defaultValue=""
                            onChange={handleChangeKpi}
                          >
                            <option value="" disabled>
                              เรื่องที่ต้องการร้องเรียน
                            </option>
                            {kpi.map((option, index) => (
                              <option key={index} value={option.key}>
                                {option.value}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="เรื่องที่ต้องการร้องเรียน"
                            name="kpi"
                            defaultValue={
                              complaint_id === "create"
                                ? null
                                : oldData[0].title
                            }
                            disabled={disabled}
                          />
                        )}

                        {/* {kpi_section === "อื่นๆ" ? (
                          <div className="relative w-full mb-3 mt-4">
                            <label
                              className="block uppercase text-gray-600 font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              ระบุเรื่องที่ต้องการร้องเรียนอื่นๆ
                            </label>

                            <input
                              type="text"
                              className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              placeholder="เรื่องที่ต้องการร้องเรียนอื่นๆคือ...."
                              name="title"
                              defaultValue={
                                complaint_id === "create"
                                  ? null
                                  : oldData[0].title
                              }
                              disabled={disabled}
                            />
                          </div>
                        ) : null} */}
                      </div>
                    </div>
                    <div className="w-full lg:w-12/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-600 font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          รายละเอียดปัญหาที่ร้องเรียน
                        </label>
                        <textarea
                          className="textarea textarea-bordered px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="รายละเอียด"
                          name="detail"
                          style={{ height: "100px" }}
                          disabled={disabled}
                          defaultValue={
                            complaint_id === "create" ? null : oldData[0].detail
                          }
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  {complaint_id === "create" ? (
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-600 font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          เอกสารประกอบการร้องเรียน
                        </label>
                        <input
                          type="file"
                          required
                          className="file-input file-input-bordered file-input-info w-full max-w-xs"
                          name="file"
                          accept=".jpeg,.jpg,.png,.pdf"
                          onChange={handleFileChange}
                          disabled={disabled}
                        />
                        {file && (
                          <div className="mt-2">
                            <p>File selected: {file.name}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-600 font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          เอกสารประกอบการร้องเรียน
                        </label>
                        <a
                          style={{
                            color: "blue",
                            cursor: "pointer",
                          }}
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            window.open(oldData[0].img, "_blank");
                          }}
                        >
                          ดูเอกสารแนบ
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-600 font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        ลายเซ็นผู้ร้องเรียน
                      </label>

                      <div className="w-96 h-60 bg-slate-50 border border-blue-200 rounded-md">
                        {complaint_id == "create" ? (
                          <>
                            <SignatureCanvas
                              ref={signatureRef}
                              penColor="black"
                              canvasProps={{
                                width: 450,
                                height: 200,
                                className: "signatureCanvas",
                              }}
                              onEnd={() => {
                                setSignatureData(
                                  signatureRef.current.toDataURL()
                                );
                              }}
                            />
                          </>
                        ) : (
                          <>
                            <img
                              src={oldData[0].sign_create_complaint}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                              }}
                            />
                            <p className="block uppercase text-gray-600  mt-2">
                              วันที่ : {oldData[0].sign_date}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  {complaint_id === "create" ? (
                    <>
                      {" "}
                      <div className="mt-5 ml-4">
                        {!signatureBlob && (
                          <>
                            <button
                              className="btn border-2 border-red-500 hover:bg-red-700 hover:text-white active:bg-red-800 mr-2"
                              onClick={(e) => {
                                e.preventDefault();
                                handleReset();
                              }}
                              disabled={disabled}
                            >
                              Reset ลายเซ็น
                            </button>
                            <button
                              className="btn btn-info"
                              onClick={(e) => {
                                e.preventDefault();
                                handleSaveSignature();
                              }}
                              disabled={signatureData === null ? true : false}
                            >
                              บันทึกลายเซ็นเจอร์
                            </button>
                          </>
                        )}
                      </div>
                      {signatureBlob && (
                        <div className="flex justify-end mt-6 mr-4">
                          <button
                            className="btn btn-info hover:bg-indigo-50 hover:text-black"
                            type="submit"
                            disabled={disabled}
                          >
                            บันทึก
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
