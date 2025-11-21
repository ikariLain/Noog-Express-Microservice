// src/index.js
import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./SwaggerConfig.js";
import StreamIO from "./routes/StreamIORoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
app.use(express.json());

// SWAGGER UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ROUTES
app.use("/api/StreamIOVideoCall", StreamIO);

// ERROR HANDLER
app.use(errorHandler);
