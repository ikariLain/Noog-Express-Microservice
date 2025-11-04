import express from "express"
import swaggerUi from "swagger-ui-express"
import swaggerJSDoc from "swagger-jsdoc"

const app = express()

// swagger options
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Noog API",
      version: "1.0.0",
    },
  },
  apis: ["./src/routes/*.js"], // var vi ska scanna swagger comments
}

const swaggerSpec = swaggerJSDoc(swaggerOptions)

// setup swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))


import userRoutes from "./Routes/StreamIORoutes.js"
app.use("/api/users", userRoutes)


const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`swagger docs: http://localhost:${port}/docs`)
})
