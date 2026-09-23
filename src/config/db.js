const mysql=require('mysql2/promise');

function createPool({host, port, user, password, database, ca}){
    return mysql.createPool({
        host, port, user, password, database,
        ssl: {ca},
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
};

module.exports={createPool};