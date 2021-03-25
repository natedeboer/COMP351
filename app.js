const http = require('http');
const mysql = require("mysql");

const db = mysql.createPool({
    connectionLimit: 10,
    multipleStatements: true,
    host: "localhost",
    user: "crazymup_indiv_project",
    password: "indiv_project",
    database: "crazymup_indiv_project"
});

const server = http.createServer(function(request, response) {
    var body = '';
    request.on('data', function(data) {
      body += data;
    });
    request.on('end', function() {
      console.log('Body: ' + body);
      response.writeHead(200, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      });
      response.end(body);
      
      let jsonParse = JSON.parse(body);
      
        db.getConnection(function (err, connection) {
            if (err) {
                throw err;
            }
            
            let deleteSQL = "DELETE FROM quote;";
            connection.query(deleteSQL, function (err, result) {
                    if (err) throw err;
                    response.end(result);
                });
            
            for (let i=0; i < jsonParse.length; i++){
                let writeSQL = 'INSERT INTO quote(quoteId, quote) VALUES(' + jsonParse[i].quoteId + ",'" + jsonParse[i].quote + "')";
                console.log(writeSQL);
                connection.query(writeSQL, function (err, result) {
                    if (err) throw err;
                    response.end(result);
                });
            }
            connection.release();
        });
    });
});
server.listen();