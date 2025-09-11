import type { INestiaConfig } from "@nestia/sdk";

const NESTIA_CONFIG: INestiaConfig = {
    input: "src/controller",
    swagger: {
        openapi: "3.1",
        output: "doc/openapi/openapi.json",
        decompose: true,
        security: { bearer: { type: "http", scheme: "bearer" } },
        servers: [{ url: "http://localhost:4000", description: "Local Server" }],
        beautify: false,
    },
};

export default NESTIA_CONFIG;
