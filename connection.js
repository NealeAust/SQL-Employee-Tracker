// Middleware required to run application

const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "BornSaints$12@",
    database: "employee_db"
  },
  console.log("Connected to the employee_db database.")
);

module.exports = db;
