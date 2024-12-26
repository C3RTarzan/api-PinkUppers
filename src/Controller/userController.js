"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControllerCreate = exports.userControllerList = void 0;
const conn_1 = __importDefault(require("../db/conn"));
const users = [];
const userControllerList = async (request, reply) => {
    try {
        // Transforme a consulta em uma Promise
        const users = await new Promise((resolve, reject) => {
            conn_1.default.query('SELECT * FROM users', (err, results) => {
                if (err) {
                    reject(err); // Rejeita a Promise em caso de erro
                }
                else {
                    resolve(results); // Resolve a Promise com os resultados
                }
            });
        });
        // Retorna os usuários na resposta
        return reply.status(200).send(users);
    }
    catch (error) {
        console.error('Erro ao buscar usuários:', error);
        return reply.status(500).send({ error: 'Erro ao buscar usuários' });
    }
};
exports.userControllerList = userControllerList;
const userControllerCreate = async (request, reply) => {
    try {
        const { name, email } = request.body;
        // Transforme a inserção no banco em uma Promise
        await new Promise((resolve, reject) => {
            conn_1.default.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err) => {
                if (err) {
                    reject(err); // Rejeita a Promise em caso de erro
                }
                else {
                    resolve(); // Resolve a Promise se a inserção for bem-sucedida
                }
            });
        });
        return reply.status(201).send();
    }
    catch (error) {
        console.error('Erro ao criar usuário:', error);
        return reply.status(500).send({ error: 'Erro ao criar usuário' });
    }
};
exports.userControllerCreate = userControllerCreate;
