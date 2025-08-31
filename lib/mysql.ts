import mysql from 'mysql2/promise';

export const db = mysql.createPool({
    host: 'localhost',       // where the database lives
    user: 'schooluser',      // the MySQL username from docker-compose
    password: 'schoolpass',  // the MySQL password
    database: 'schools',     // the database name
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export type School = {
    id: number;
    name: string;
    address: string;
    city: string;
    state: string;
    contact: number;
    image: string;
    email_id: string;
};
