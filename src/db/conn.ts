import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

// Tipos para a conexão
interface DbConfig {
  host: string;
  user: string;
  password: string;
  database: string;
}

// Crie a configuração do banco de dados
const dbConfig: DbConfig = {
  host: process.env.DB_HOST || 'localhost', // Endereço do servidor MySQL
  user: process.env.DB_USER || 'root', // Usuário do MySQL
  password: process.env.DB_PASSWORD || '', // Senha do MySQL
  database: process.env.DB_NAME || '', // Nome do banco de dados
};

// Crie a conexão com o banco de dados
const connection = mysql.createConnection(dbConfig);

// Conecte ao banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('Conexão bem-sucedida ao MySQL');
});

export default connection;
