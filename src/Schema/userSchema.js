"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchemaCreate = exports.userSchemaList = void 0;
const zod_1 = require("zod");
exports.userSchemaList = {
    tags: ['users'],
    description: 'List all users',
    response: {
        200: zod_1.z.array(zod_1.z.object({
            name: zod_1.z.string(),
            email: zod_1.z.string(),
        })),
        500: zod_1.z.object({
            error: zod_1.z.string().describe('Error message'),
        }),
    },
};
exports.userSchemaCreate = {
    tags: ['users'],
    description: 'Create a new user',
    body: zod_1.z.object({
        name: zod_1.z.string(),
        email: zod_1.z.string().email(),
    }),
    response: {
        201: zod_1.z.null().describe('User created'),
        500: zod_1.z.object({
            error: zod_1.z.string().describe('Error message'),
        }),
    },
};
