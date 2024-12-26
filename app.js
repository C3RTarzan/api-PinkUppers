"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = require("fastify");
require("dotenv/config");
const cors_1 = require("@fastify/cors");
const fastify_type_provider_zod_1 = require("fastify-type-provider-zod");
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const routers_1 = require("./src/routers");
const PORT = Number(process.env.PORT) || Number(process.env.PORT_SERVER);
const app = (0, fastify_1.fastify)().withTypeProvider(); // Create a new Service Provider
// CORS configuration
app.register(cors_1.fastifyCors, { origin: "*" });
// Validation of input and output data
app.setValidatorCompiler(fastify_type_provider_zod_1.validatorCompiler);
app.setSerializerCompiler(fastify_type_provider_zod_1.serializerCompiler);
// Swagger configuration for API documentation
app.register(swagger_1.default, {
    openapi: {
        info: {
            title: "Typed API",
            version: "1.0.0",
        },
    },
    transform: fastify_type_provider_zod_1.jsonSchemaTransform,
});
app.register(swagger_ui_1.default, {
    routePrefix: "/docs",
}); // Access the documentation of the routers
// Register the router
app.register(routers_1.router);
// Start the server
app.listen({ port: PORT }).then(() => {
    console.log(`HTTP Server running on port ${PORT}`);
});
