import CONFIG from '@/config';
import mysql from 'mysql2/promise';

export const connectDatabase = async () => {
    return mysql.createPool({
        host: CONFIG.DB.HOST,
        user: CONFIG.DB.USER,
        password: CONFIG.DB.PASSWORD,
        port: CONFIG.DB.PORT,
        database: CONFIG.DB.NAME,
        multipleStatements: true, // Prevent nested sql statements
        connectTimeout: 60 * 60 * 1000,
        decimalNumbers: true,
        // debug: true,
    });
};