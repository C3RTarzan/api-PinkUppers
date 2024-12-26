"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Crie a configuração do banco de dados
const dbConfig = {
    host: process.env.DB_HOST || 'localhost', // Endereço do servidor MySQL
    user: process.env.DB_USER || 'root', // Usuário do MySQL
    password: process.env.DB_PASSWORD || '', // Senha do MySQL
    database: process.env.DB_NAME || '', // Nome do banco de dados
};
// Crie a conexão com o banco de dados
const connection = mysql2_1.default.createConnection(dbConfig);
// Conecte ao banco de dados
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }
    console.log('Conexão bem-sucedida ao MySQL');
});
exports.default = connection;
