const db = require("./db/connection.sql");
// const mysql = require("mysql2");
const inquirer = require("inquirer");
const consTable = require("console.table");

const employees = [];

function mainMenu() {
    inquirer.prompt([
        {
            type: "list",
            name: "choiceSelect",
            message: "What would you like to do?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee role",
            ],
        },
    ])

        .then((answers) => {
            console.log(answers);
            if (answers.choiceSelect === "View all departments") {
                displayDepartments();
            }

            if (answers.choiceSelect === "View all roles") {
                displayRoles();
            }

            if (answers.choiceSelect === "View all employees") {
                displayEmployees();
            }

            if (answers.choiceSelect === "Add a department") {
                addDepartment();
            }

            if (answers.choiceSelect === "Add a role") {
                addRole();
            }

            if (answers.choiceSelect === "Add an employee") {
                addEmployee();
            }

            if (answers.choiceSelect === "Update an employee role") {
                updateEmployeeRole();
            }
        });
};

function displayDepartments() {
    db.query("SELECT * FROM department", (error, results) => {
        if (err) throw err;
        console.table(results);
        mainMenu();
    });
};


function displayRoles() {
    db.query("SELECT * FROM role", (error, results) => {
        if (err) throw err;
        console.table(results);
        mainMenu();
    });
};

function displayEmployees() {
    db.query("SELECT * FROM role", (error, results) => {
        if (err) throw err;
        console.table(results);
        mainMenu();
    });
};

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter the name of the department.",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    return console.log("No entry detected, please try again!");
                }
            },
        },
    ])
        .then((answers) => {
            const sql = `INSERT INTO department (name) VALUES (?)`;
            const paramas = [answers.name];
            db.query(sql, params, (err, results) => {
                if (err) throw err;
                console.log("Added " + answers.nameInput + " to departments!");
                mainMenu()
            });
        });
};

function addRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "role",
            message: "What is the title of the new role?",
            validate: roleInput => {
                if (roleInput) {
                    return true;
                } else {
                    return console.log("No entry detected, please try again!");
                }
            },
        },

        {
            type: "input",
            name: "salary",
            message: "Enter the annual salary for the role.",
            validate: salaryInput => {
                if (salaryInput) {
                    return true;
                } else {
                    return console.log("No entry detected, please try again!");
                }
            },
        },
        {
            type: "input",
            name: "department_id",
            message: "Enter id of department.",
            validate: idInput => {
                if (idInput) {
                    return true;
                } else {
                    return console.log("No entry detected, please try again!");
                }
            },
        },
    ])
        .then((answers) => {
            const sql = "INSERT INTO role (role, salary, department_id) VALUES  (?,?,?)";
            const params = [answers.role, answers.salary, department_id]
            db.query(sql, params, (err, results) => {
                if (err) throw err;
                console.log("Added " + answers.role + " to roles!");
                mainMenu()
            });
        })
}

function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "Enter the employee's first name",
            validate: idInput => {
                if (nameInput) {
                    return true;
                } else {
                    return console.log("No entry detected, please try again!");
                }
            },
        },

        {
            type: "input",
            name: "last_name",
            message: "Enter the employee's last name?",
            validate: (nameInput) => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("No entry detected, please try again!");
                }
            },
        },

        {
            type: "input",
            name: "role_id",
            message: "Enter the employee's role id",
            validate: (idInput) => {
                if (idInput) {
                    return true;
                } else {
                    console.log("No entry detected, please try again!");
                }
            },
        },

        {
            type: "input",
            name: "manager_id",
            message: "Enter the manager's id",
            validate: (idInput) => {
                if (idInput) {
                    return true;
                } else {
                    console.log("No entry detected, please try again!");
                }
            },
        },

    ])

        .then((answers) => {
            const sql = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)";
            const params = [answers.first_name, answers.last_name, answers.role_id, answers.manager_id];

            db.query(sql, params, (err, results) => {
                if (err) throw err;
                console.log("Employee has been added")
                mainMenu();
            });
        });
}

function updateEmployeeRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "employee_id",
            message: "Enter the id of the employee",
            validate: (idinput) => {
                if (idinput) {
                    return true;
                } else {
                    console.log("No entry detected, please try again!")
                }
            },
        },

        {
            type: "input",
            name: "role_id",
            message: "Enter the employees new role id",
            validate: (idInput) => {
                if (idInput) {
                    return true;
                } else {
                    console.log("No entry detected, please try again!");
                }
            },
        },
    ])
        .then((answers) => {
            const sql = "UPDATE employee SET role_id = ? WHERE employee_id = ?";
            const params = [answers.role.id, answers.employee_id];

            db.query(sql, params, (err, results) => {
                if (err) throw err;
                console.log("Role id update to" + answers.role_id)
                mainMenu();
            });
        });
};

