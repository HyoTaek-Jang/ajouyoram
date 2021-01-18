var mysql = require("mysql");

var db = mysql.createConnection({
  host: "localhost",
  // port: "3306",
  user: "root",
  password: "wkdWkddl1218",
  database: "yoraming",
});

db.connect((err) => {
  if (err) throw err;
});

module.exports = db;
