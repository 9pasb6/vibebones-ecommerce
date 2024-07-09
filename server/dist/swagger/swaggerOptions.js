"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schemas = require("./swaggerSchemas");
module.exports = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Documentation - VibeBones Ecommerce",
            version: "0.0.1",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
        components: {
            schemas,
        },
    },
    apis: ["./routes/*.ts"], // files containing annotations as above
};
//# sourceMappingURL=swaggerOptions.js.map