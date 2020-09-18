const mysql = require('mysql2');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    database: 'examenweb',
    password: 'admin123'
});


//module.exports = pool.promise();
module.exports = pool;