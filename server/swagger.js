const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./server.js"];

const doc = {
  info: {
    version: "1.0.0",
    title: "CPN Test API",
    description: "API Documentation for CPN Test Server",
    contact: {
      name: "Developer API",

    },
  },
  host: "localhost:3000",
  basePath: "/",
  schemes: [
    "http"
  ],
};

swaggerAutogen(outputFile, endpointsFiles, doc);