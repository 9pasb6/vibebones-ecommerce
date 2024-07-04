"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schemas = require("./swaggerSchemas");
module.exports = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Documentation - Face-Ads-Display",
            version: "0.0.1",
            description: "La API de Face-Ads-Display es una plataforma avanzada para mostrar anuncios publicitarios personalizados basados en métricas biométricas en tiempo real. Permite a los comercios gestionar anuncios y visualizar métricas a través de una aplicación de escritorio. Desarrollada con tecnologías como React, Node.js y PostgreSQL, la API ofrece seguridad con JWT y bcrypt, y está estructurada con una arquitectura MVC para una interacción eficiente entre usuarios y administradores.",
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
    apis: ["./routes/*.js"], // files containing annotations as above
};
//# sourceMappingURL=swaggerOptions.js.map