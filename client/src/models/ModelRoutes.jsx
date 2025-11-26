import HomePage from "../pages/HomePage";
import CreateComplaint from "../pages/CreateComplaint";
import ComplaintPage from "../pages/ComplaintPage";
import FormComplaint from "../pages/FormComplaint";
export const ModelIndex = [
  {
    id: 1,
    routerName: "HomePage",
    routerPath: "/",
    routerComponent: <HomePage />,
  },

  {
    id: 5,
    routerName: "FormComplaint",
    routerPath: "/form-complaint/:complaint_id",
    routerComponent: <FormComplaint />,
  },
  {
    id: 5,
    routerName: "CreateComplaint",
    routerPath: "/create-complaint",
    routerComponent: <CreateComplaint />,
  },
  {
    id: 5,
    routerName: "ComplaintPage",
    routerPath: "/complaint",
    routerComponent: <ComplaintPage />,
  },
];
