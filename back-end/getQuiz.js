let http = require('http');
let url = require('url');
const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "crazymup_indiv_project",
    password: "indiv_project",
    database: "crazymup_indiv_project"
});

var server = http.createServer(function(req, res) {
    let q = url.parse(req.url, true);
    res.writeHead(200, { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    db.connect(function (err) {
        if (err) {
            throw err;
        }
        let sql = "SELECT * FROM quote";
        db.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.end(JSON.stringify(result));
        })
    })

});
server.listen();
