import React, { useState, useRef, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import API from "../../utils/ApiUrl";
import { ApiRouter } from "../../utils/ApiRouter";
import Swal from "sweetalert2";
import SkeletonComponent from "../SkeletonComponent/SkeletonComponent";
import { Divider } from "antd";

export default function Tacking(props) {
  let complaint_id = props.complaint_id;
  const oldData = props.tackingData;
  const status_no = props.status_no;

  const user = localStorage.getItem("FullName");
  const section = localStorage.getItem("Section");

  const [signatureData, setSignatureData] = useState(null);
  const [signatureBlob, setSignatureBlob] = useState(null);
  const signatureRef = useRef(); // สร้าง ref สำหรับ SignatureCanvas
  let type_status = "ปิดได้";
  if (oldData.length > 0) {
    type_status = oldData[0].status;
  }

  const [selectedOption, setSelectedOption] = useState(type_status); // default value

  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (oldData.length > 0) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = async (e) => {
    event.preventDefault(); // Prevent the default form submission
    const data = {};

    const formData = new FormData(e.target);
    formData.forEach((value, key) => {
      data[key] = value;
    });
    data.sign_close_job = signatureData;
    // data.file = file;
    // data.complaint_id = complaint_id;
    // data.sign_create_receiver = signatureData;
    data.close_by = user;
    data.status = selectedOption;

    Swal.fire({
      icon: "question",
      title: "คุณต้องการส่งข้อมูลใช่ไหม?",
      showDenyButton: true,
      confirmButtonText: "ใช่",
      denyButtonText: `ไม่ใช่`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const res = await API.put(
          ApiRouter.editorTracking + complaint_id,
          data
        );
        if (res.data.status === true) {
          setDisabled(true);
          Swal.fire("Saved!", "", "success");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
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
      {/* {loading ? (
            <>
              <SkeletonComponent />
            </>
          ) : ( */}

      <>
        <div>
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-gray-700 text-xl font-bold">
                  ติดตามผลโดยผู้ร้องเรียน
                </h6>
              </div>
            </div>
            {status_no === "4" || status_no === "5" ? (
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0 ">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-wrap mt-6">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-600 font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        ผู้ติดตามผล
                      </label>

                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        // placeholder="เบอร์โทรผู้ร้องเรียน"
                        name="close_by"
                        defaultValue={
                          oldData.length === 0 ? user : oldData[0].close_by
                        }
                        disabled={true}
                      />
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label className="block uppercase text-gray-600 font-bold mb-2">
                          ผลการร้องเรียน
                        </label>
                        <div className="mb-6">
                          <div className="ml-6 flex items-center">
                            <input
                              type="radio"
                              value="ปิดได้"
                              checked={selectedOption === "ปิดได้"}
                              onChange={handleChange}
                              className="radio radio-info mr-2"
                              name="status"
                              disabled={oldData.length === 0 ? false : true}
                            />
                            <span className="label-text text-gray-600">
                              ปิดได้
                            </span>
                          </div>
                          <div className="ml-6 flex items-center mt-2">
                            <input
                              type="radio"
                              value="ปิดไม่ได้"
                              checked={selectedOption === "ปิดไม่ได้"}
                              onChange={handleChange}
                              className="radio radio-info mr-2"
                              name="status"
                              disabled={oldData.length === 0 ? false : true}
                            />
                            <span className="label-text text-gray-600">
                              ปิดไม่ได้
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {selectedOption === "ปิดไม่ได้" ? (
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-gray-600 font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            ออกใบร้องเรียนใหม่ เลขที่
                          </label>
                          <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="ออกใบร้องเรียนใหม่ เลขที่"
                            name="new_complaint_id"
                            defaultValue={
                              oldData.length === 0
                                ? null
                                : oldData[0].new_complaint_id
                            }
                            disabled={oldData.length === 0 ? false : true}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-gray-600 font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            วันที่ปิดงาน
                          </label>
                          <input
                            type={
                              oldData.length === 0 ? "datetime-local" : "text"
                            }
                            className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="กำหนดแก้ไขเสร็จสิ้นภายใน"
                            name="close_date"
                            defaultValue={
                              oldData.length === 0
                                ? null
                                : oldData[0].close_date
                            }
                            disabled={oldData.length === 0 ? false : true}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-600 font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        ลายเซ็นผู้ติดตามผลโดยผู้ร้องเรียน
                      </label>

                      <div className="w-96 h-60 bg-slate-50 border border-blue-200 rounded-md">
                        {oldData.length === 0 ? (
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
                              src={oldData[0].sign_close_job}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                              }}
                            />
                            <p className="block uppercase text-gray-600  mt-2">
                              วันที่ : {oldData[0].sign_close_date}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  {oldData.length === 0 ? (
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
                              //   disabled={disabled}
                            >
                              Reset ลายเซ็น
                            </button>
                            <button
                              className="btn btn-info"
                              onClick={(e) => {
                                e.preventDefault();
                                handleSaveSignature();
                              }}
                              //   disabled={disabled}
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
                            // disabled={disabled}
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
            ) : null}
          </div>
        </div>
      </>
      {/* )} */}
    </>
  );
}
