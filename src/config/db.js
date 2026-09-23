const mysql=require('mysql2/promise');

function createPool({host, port, user, password, database, ca, waitForConnections=true, connectionLimit=10, queueLimit=0}){
    return mysql.createPool({
        host, port, user, password, database,
        ssl: {ca},
        waitForConnections,
        connectionLimit,
        queueLimit
    });
};

module.exports={createPool};