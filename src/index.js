var express = require('express');
var app = express();
const http =require("http");
const port =8080;
const Connection =require('./connection/sql.connection')

app.get("/" ,function(req ,resp){
    Connection.query("SELECT * FROM testtable", function(error ,rows ,fields){
        if(!!error){
            console.log("Error in the query");
        }else{
            console.log("success fully query");
            console.log(rows[0]);
            resp.send("hello," +rows[0].Name);
        }   
    })
})
// app.get("/" , function(req ,res){
//       Connection.getConnection(function(error ,tempCOunt){
//         if(error){
//             tempCOunt.release();
//             console.log("error");
//         }else{
//             console.log("successfully connected");
//             tempCOunt.query("SELECT * FROM testtable", function(error ,rows ,fields){
//                 tempCOunt.release();
//                 if(!!error){
//                     console.log("Error in the query");
//                 }else{
//                     res.json(rows);
//                 }
//             })
//         }
//       })
// })


http.createServer(app).listen(port ,() =>{
    console.log("Server SuccessFully running " + port);
})