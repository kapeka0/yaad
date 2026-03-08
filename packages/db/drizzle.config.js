"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    schema: "./src/schema.ts",
    out: "./migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL ?? "postgresql://yaad:yaad@localhost:5432/yaad",
    },
};
//# sourceMappingURL=drizzle.config.js.map