//Swagger congiguration
import swaggerJSDoc from "swagger-jsdoc"

export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Noog API",
      version: "1.0.0",
    },
  },
  apis: [
    // Path to the API docs
     "src/Routes/StreamIORoutes.js"
    ],
}

export const swaggerSpec = swaggerJSDoc(swaggerOptions)
