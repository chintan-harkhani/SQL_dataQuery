let express = require("express");
let app = express();
const http = require("http");
const bodyParser = require("body-parser");
const Connection = require("./connection/sql.connection");
const port = 6060;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/rigister.html")
})
app.set("view engine", "ejs");

app.post("/", function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;

    Connection.connect(function (error) {
        if (error) console.log(error);

        let SQL = "INSERT INTO `student`( `name`, `email`, `phone`) VALUES ('" + name + "','" + email + "','" + phone + "')";
        Connection.query(SQL, function (error, result) {
            if (error) throw error;
            console.log("1 record inserted");
            res.redirect("/student");

        });
    });
})

app.get("/student", function (req, res) {
    Connection.connect(function (error) {
        if (error) console.log(error);

        let SQL = "SELECT * FROM student";

        Connection.query(SQL, function (error, result) {
            if (error) console.log(error);

            res.render(__dirname + "/views/student.ejs", { student: result })
            // console.log(result);
        })
    })
});

app.get("/student-delete", (req, res) => {
    Connection.connect(function (error) {
        if (error) console.log(error);

        let SQL = "DELETE FROM student WHERE id = " + req.query.id;

        Connection.query(SQL, (error, result) => {
            if (error) console.log(error);
            res.redirect("/student");
        })
    })
})

app.get("/student-update", (req, res) => {
    Connection.connect(function (error) {
        if (error) console.log(error);
        let SQL = "SELECT * FROM student WHERE id = " + req.query.id;
        Connection.query(SQL, (error, result) => {
            if (error) console.log(error);
            res.render(__dirname + "/views/update.ejs", { student: result })
        })
    })
})
app.post("/student-update", (req, res) => {

    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var id = req.body.id;

    Connection.connect(function (error) {
        if (error) console.log(error);

        let SQL = "UPDATE student SET name='" + name + "',email='" + email + "',phone='" + phone + "' WHERE id =" + id;
        //   let SQL= "UPDATE student SET name=? ,email=? ,phone=? WHERE id=?";

        //     Connection.query(SQL,[name,email,phone,id], (error, result) => {
        //         if (error) console.log(error);
        //         res.redirect("/student");
        //   })

        Connection.query(SQL, (error, result) => {
            if (error) console.log(error);
            res.redirect("/student");
        })
    })
})

app.get('/student-search', (req, res) => {
    Connection.connect(function (error) {
        if (error) console.log(error);


        let SQL = "SELECT * FROM student";
        Connection.query(SQL, (error, result) => {
            if (error) console.log(error);
            res.render(__dirname + "/views/search.ejs", { student: result })
        })
    })
})

app.get("/search", (req, res) => {
    var name = req.query.name;
    var email = req.query.email;
    var phone = req.query.phone;

    Connection.connect(function (error) {
        if (error) console.log(error);

        // var SQL = "SELECT * FROM student WHERE name LIKE '%" + name + "%' AND email LIKE '%" + email + "%' AND phone LIKE '%" + phone + "%'";
        var SQL = "SELECT * FROM student WHERE name LIKE '%" + name + "%' AND email LIKE '%" + email + "%' AND phone LIKE '%"+phone+"%'";
    
          Connection.query(SQL , (error ,result)=>{
            if(error) console.log(error);
            res.render(__dirname + "/views/search.ejs", {student : result});
          })

    })
});
    http.createServer(app).listen(port, () => {
        console.log("Server SuccessFully running " + port);
    })