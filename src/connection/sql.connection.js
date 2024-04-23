const Mysql = require('mysql');

const Connection = Mysql.createConnection({host: 'localhost',user: 'root',password: '', database: 'sampledb'})
//   const Connection = Mysql.createPool({connectionLimit:50,host: 'localhost',user: 'root',password: '', database: 'sampleDB'})

//     Connection.connect(function (error) {
//     if (!!error) {
//         console.log("error database");
//     } else {
//         console.log("Database connected");
//     }
// })

 



module.exports = Connection;