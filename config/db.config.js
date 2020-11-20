require("dotenv");
const mysql = require("mysql");

// Create a connection to the database
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "Madmax94",
  database: "testDB",
});
// console.log(connection);
// console.log(process.env.PASSWORD);

// open the MySQL connection
connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;
