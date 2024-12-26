import { fastify } from "fastify";
import 'dotenv/config';
import { fastifyCors } from "@fastify/cors";
import { validatorCompiler, serializerCompiler, type ZodTypeProvider, jsonSchemaTransform } from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { router } from "./src/routers";

const PORT = Number(process.env.PORT) || Number(process.env.PORT_SERVER);

const app = fastify().withTypeProvider<ZodTypeProvider>(); // Create a new Service Provider

// CORS configuration
app.register(fastifyCors, { origin: "*" });

// Validation of input and output data
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// Swagger configuration for API documentation
app.register(fastifySwagger, {
    openapi: {
        info: {
            title: "Typed API",
            version: "1.0.0",
        },
    },
    transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
    routePrefix: "/docs",
}); // Access the documentation of the routers

// Register the router
app.register(router);

// Start the server
app.listen({ port: PORT }).then(() => {
    console.log(`HTTP Server running on port ${PORT}`);
});
