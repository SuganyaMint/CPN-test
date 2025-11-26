import React from "react";
import logo from "../assets/logo-venine.png";
import ComplaintCreate from "../components/ComplaintForm/ComplaintCreate";
function CreateComplaint() {
    return (
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
            สร้างใบร้องเรียน
          </p>
    
       <ComplaintCreate/>
        </div>
      );
}

export default CreateComplaint