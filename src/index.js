// src/index.js
import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./SwaggerConfig.js";
import StreamIO from "./routes/StreamIORoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import serverless from "serverless-http";

const app = express();
app.use(express.json());

// SWAGGER UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ROUTES
app.use("/api/StreamIOVideoCall", StreamIO);

// ERROR HANDLER
app.use(errorHandler);

// Export serverless for Vercel
export default serverless(app);

// Local development
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Docs at http://localhost:${port}/docs`);
  });
}
