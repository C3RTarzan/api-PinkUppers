import { z } from "zod";

export const userSchemaList = {
    tags: ['users'],
    description: 'List all users',
    response: {
        200: z.array(z.object({
            name: z.string(),
            email: z.string(),
        })),
        500: z.object({
            error: z.string().describe('Error message'),
        }),
    },
};

export const userSchemaCreate = {
    tags: ['users'],
    description: 'Create a new user',
    body: z.object({
        name: z.string(),
        email: z.string().email(),
    }),
    response: {
        201: z.null().describe('User created'),
        500: z.object({
            error: z.string().describe('Error message'),
        }),
    },
};
