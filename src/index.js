// src/index.js
import express from "express"
import swaggerUi from "swagger-ui-express"
import { swaggerSpec } from "./SwaggerConfig.js"
import StreamIO from "./Routes/StreamIORoutes.js"
import { errorHandler } from "./middlewares/errorHandler.js"

const app = express()
app.use(express.json())


// SWAGGER UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// ROUTES
app.use("/api/StreamIOVideoCall", StreamIO)

app.use(errorHandler);

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
  //Route to Swagger docs
  console.log(`Docs at http://localhost:${port}/docs`)
})
