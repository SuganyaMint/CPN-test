import { Routes, Route } from "react-router-dom";
import Layout from "../layouts/Layout";
import { ModelIndex } from "../models/ModelRoutes";
import LoginPage from "../pages/LoginPage";
import { useEffect, useState } from "react";
import ApiUrl from "../utils/ApiUrl";
import { ApiRouter } from "../utils/ApiRouter";

function RouteIndex() {
  const [FullName, setFullName] = useState("");
  const [Emp_cpde, setEmp_code] = useState("");
  const token = localStorage.getItem("token");

  if (!token) {
    return <LoginPage />;
  }

  useEffect(() => {
    const checkToken = async () => {
      const res = await ApiUrl.get(ApiRouter.authen, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.status === false) {
        localStorage.removeItem("token");
        window.location.href = "/";
        return;
      }
      setFullName(res.data.data[0].FullName);
      setEmp_code(res.data.data[0].EmpCode);
      //set storage
      localStorage.setItem("emp_id", res.data.data[0].EmpCode);
      localStorage.setItem("FullName", res.data.data[0].FullName);
      localStorage.setItem("Section", res.data.data[0].ParentOrgUnitName);

      // const getADM = await ApiUrl.get(
      //   ApiRouter.amdSection + "/" + res.data.data[0].EmpCode
      // );
      // let dataadm = getADM.data.data;
      // let role = "user";
      // if (dataadm.length > 0) {
      //   role = dataadm[0].position;
      // }
      // localStorage.setItem("Role", role);
    };
    checkToken();
  }, []);

  return (
    <>
      <Routes>
        <Route element={<Layout name={FullName} empcode={Emp_cpde} />}>
          {ModelIndex.length > 0 ? (
            <>
              {ModelIndex.map((item, i) => (
                <Route
                  key={i}
                  path={item.routerPath}
                  element={item.routerComponent}
                />
              ))}
            </>
          ) : (
            <></>
          )}
        </Route>
      </Routes>
    </>
  );
}

export default RouteIndex;
