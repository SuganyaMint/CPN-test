import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import logo from "../assets/logo-venine.png";
import { ApiRouter } from "../utils/ApiRouter";
import API from "../utils/ApiUrl";
import SkeletonComponent from "../components/SkeletonComponent/SkeletonComponent";
import ReceivereMgr from "../components/ComplaintForm/ReceivereMgr";
import ComplaintCreate from "../components/ComplaintForm/ComplaintCreate";
import Receivere from "../components/ComplaintForm/Receivere";
import EditerComplaint from "../components/ComplaintForm/EditerComplaint";
import Tacking from "../components/ComplaintForm/Tacking";

export default function FormComplaint() {
  const { complaint_id } = useParams();

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [receiver, setReceiver] = useState([]);
  const [receiverMgr, setReceiverMgr] = useState([]);
  const [editor, setEditor] = useState([]);
  const [tackingData, setTackingData] = useState([]);
  const [complaint, setComplaint] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
      
        const getMgr = await API.get(`${ApiRouter.receiverMgr}${complaint_id}`);
        if (getMgr.data.status === true) {
          setReceiverMgr(getMgr.data.data);
        }else{
          setReceiverMgr([]);
        }
        const getEditor = await API.get(`${ApiRouter.editor}${complaint_id}`);
        if (getEditor.data.status === true) {
          setEditor(getEditor.data.data);
        }else{
          setEditor([]);
        }

        const getTacking = await API.get(`${ApiRouter.editor}/tracking/${complaint_id}`);
        if (getTacking.data.status === true) {
          setTackingData(getTacking.data.data);
        }else{
          setTackingData([]);
        }

        const getComplaint = await API.get(`${ApiRouter.complaint}/${complaint_id}`);

        setComplaint(getComplaint.data.data)

         const res = await API.get(`${ApiRouter.receiver}/${complaint_id}`); 
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
          setReceiver(itemsWithImages);
        }

        setDisabled(true);
        setLoading(true);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

console.log(complaint)
  return (
    <>
      {loading === true ? (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginTop: "20px",
            }}
          >
            <img
              style={{
                width: "100px",
                height: "auto",
              }}
              src={logo}
            />
          </div>
          <p
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              textAlign: "center",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            ใบร้องเรียน
          </p>
          <div>
            <ComplaintCreate complaint_id={complaint_id} complaint ={complaint} status_no = {complaint[0].status_no}/>
            <Receivere complaint_id={complaint_id}  receiver ={receiver} status_no = {complaint[0].status_no}/>
            <ReceivereMgr complaint_id={complaint_id}  receiver ={receiverMgr} status_no = {complaint[0].status_no}/>
            <EditerComplaint complaint_id={complaint_id}  receiver ={editor} status_no = {complaint[0].status_no}/>
            <Tacking complaint_id={complaint_id}  tackingData ={tackingData} status_no = {complaint[0].status_no}/>

          </div>{" "}
        </div>
      ) : (
        <SkeletonComponent />
      )}
    </>
  );
}
