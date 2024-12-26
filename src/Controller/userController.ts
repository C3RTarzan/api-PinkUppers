import { FastifyReply, FastifyRequest } from "fastify";
import { randomUUID } from "node:crypto";

import connection from '../db/conn';

interface User {
    id: string;
    name: string;
    email: string;
}

const users: User[] = [];

export const userControllerList = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        // Transforme a consulta em uma Promise
        const users = await new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users', (err, results) => {
                if (err) {
                    reject(err); // Rejeita a Promise em caso de erro
                } else {
                    resolve(results); // Resolve a Promise com os resultados
                }
            });
        });

        // Retorna os usuários na resposta
        return reply.status(200).send(users);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        return reply.status(500).send({ error: 'Erro ao buscar usuários' });
    }
};

export const userControllerCreate = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { name, email } = request.body as { name: string; email: string };

        // Transforme a inserção no banco em uma Promise
        await new Promise<void>((resolve, reject) => {
            connection.query(
                'INSERT INTO users (name, email) VALUES (?, ?)',
                [name, email],
                (err) => {
                    if (err) {
                        reject(err); // Rejeita a Promise em caso de erro
                    } else {
                        resolve(); // Resolve a Promise se a inserção for bem-sucedida
                    }
                }
            );
        });

        return reply.status(201).send();
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        return reply.status(500).send({ error: 'Erro ao criar usuário' });
    }
};
