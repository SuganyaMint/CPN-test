const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors()); 
app.use(express.json());

// Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger_output.json");

// routes
const favoritesRoutes = require("./src/routes/favorites.routes");
const propertiesRoutes = require("./src/routes/properties.routes");
const userRoutes = require("./src/routes/user.routes");


app.use("/api/v1/favorites", favoritesRoutes);
app.use("/api/v1/properties", propertiesRoutes);
app.use("/api/v1/users", userRoutes);



app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(PORT, () => {
  console.log(
    `Server is Running at http://localhost:${PORT}/api-docs/`
  );
});
