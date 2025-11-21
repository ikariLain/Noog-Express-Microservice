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
     "src/router/StreamIORoutes.js",
     "./src/controllers/*.js",
     "./src/middlewares/*.js"
    ],
}

export const swaggerSpec = swaggerJSDoc(swaggerOptions)
