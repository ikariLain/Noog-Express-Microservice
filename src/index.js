// src/index.js
import express from "express"
import swaggerUi from "swagger-ui-express"
import { swaggerSpec } from "./SwaggerConfig.js"
import StreamIO from "./Routes/StreamIORoutes.js"
import { errorHandler } from "./middlewares/errorHandler.js"
import serverless from "serverless-http";

const index = express()
index.use(express.json())


// SWAGGER UI
index.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// ROUTES
index.use("/StreamIOVideoCall", StreamIO)

// ERROR HANDLER
index.use(errorHandler);

export default serverless(index);

const port = process.env.PORT || 5000
index.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
  //Route to Swagger docs
  console.log(`Docs at http://localhost:${port}/docs`)
 })
