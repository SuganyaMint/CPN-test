export const apiKey = "w9Ufg3LJ7IPG0WQme21nv3tQ";

export const ApiRouter = {
  logout: "/api/v1/login/logout",
  // user: {
  //   login: "/api/v1/mb52/auth/login",
  //   profile: "/api/v1/mb52/auth/profile",
  //   allUser: "/api/v1/mb52/users"
  // },
  master: {
    allProduct: "/api/v1/mb52/master/allplan",
    bomByOrderNumber: "/api/v1/mb52/master/bom/order"
  },
  material: {
    allMaterials: "/api/v1/mb52/sap/material",
    materialByCode: "/api/v1/mb52/sap/material/location",
    locationByCode: "/api/v1/mb52/sap/material/location/by",
  },
  
  properties:{
    properties: "/api/v1/properties"
  }
  ,
  user:{
    user:"/api/v1/users",
    favorites:"/api/v1/favorites",
    register:"/api/v1/users/register"
  },
  favorites:{
    add:"/api/v1/favorites/add",
    remove:"/api/v1/favorites/remove"
  }
};

