import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'dbblog',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
// WQZK-MWSM
// Ironman2528.

// Fonction de requête générique avec meilleure gestion d'erreurs
export async function queryDB(sql, params = []) {
    let connection;
    try {
        connection = await pool.getConnection();
        const [results] = await connection.execute(sql, params);
        return results;
    } catch (error) {
        console.error('Database error:', error);
        throw new Error('Database operation failed');
    } finally {
        if (connection) connection.release(); // Utilisez release() au lieu de end()
    }
}

// Version alternative pour les transactions
export async function transactionalQueryDB(sql, params = []) {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
        const [results] = await connection.execute(sql, params);
        await connection.commit();
        return results;
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

export default pool;