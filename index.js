const db = require("./db/connection.sql");
// const mysql = require("mysql2");
const inquirer = require("inquirer");
require("console.table");

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
    db.query("SELECT * FROM department", (err, results) => {
        if (err) throw err;
        console.table(results);
        mainMenu();
    });
};

function displayRoles() {
    db.query("SELECT * FROM role", (err, results) => {
        if (err) throw err;
        console.table(results);
        mainMenu();
    });
};

function displayEmployees() {
    db.query("SELECT * FROM employee", (err, results) => {
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
            const params = [answers.name];
            db.query(sql, params, (err, results) => {
                if (err) throw err;

                console.log("**************************************");
                console.log("Added " + answers.name + " to departments!");
                console.log("**************************************");

                mainMenu()
            });
        });
};

function addRole() {
    db.query("SELECT * FROM department", (err, results) => {
        if (err) throw err;
        // console.log(results);
        const departmentChoices = results.map((department) => {
            return {
                name: department.name,
                value: department.id,

            }

        });

        console.log(departmentChoices)



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
                type: "list",
                name: "department_id",
                message: "Select department.",
                choices: departmentChoices,
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
                const sql = "INSERT INTO role (title, salary, department_id) VALUES  (?,?,?)";
                const params = [answers.role, answers.salary, answers.department_id]
                db.query(sql, params, (err, results) => {
                    if (err) throw err;
                    console.log("Added " + answers.role + " to roles!");
                    mainMenu()
                });
            })
    })
}

function addEmployee() {

    db.query("SELECT * FROM role", (err, results) => {
        if (err) throw err;
        // console.log(results);
        const roleChoices = results.map((role) => {
            return {
                name: role.title,
                value: role.id,

            }
        });

        console.log(roleChoices)

        db.query("SELECT * FROM employee", (err, results) => {
            if (err) throw err;
            // console.log(results);
            const managerChoices = results.map((employee) => {
                return {
                    name: employee.first_name + employee.last_name,
                    value: employee.manager_id,

                }
            });
            console.log(managerChoices)



            inquirer.prompt([
                {
                    type: "input",
                    name: "first_name",
                    message: "Enter the employee's first name",
                    validate: nameInput => {
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
                    type: "list",
                    name: "role",
                    message: "Select employee role",
                    choices: roleChoices,
                    validate: (idInput) => {
                        if (idInput) {
                            return true;
                        } else {
                            console.log("No entry detected, please try again!");
                        }
                    },
                },

                {
                    type: "list",
                    name: "manager_id",
                    message: "Enter the manager's id",
                    choices: managerChoices,
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
        })
    })
}


function updateEmployeeRole() {

    db.query("SELECT * FROM employee", (err, results) => {
        if (err) throw err;
        // console.log(results);
        const employeeChoices = results.map((employee) => {
            return {
                name: employee.first_name + employee.last_name,
                value: employee.id,

            }
        });
        console.log(employeeChoices)

        db.query("SELECT * FROM role", (err, results) => {
            if (err) throw err;
            // console.log(results);
            const roleChoices = results.map((role) => {
                return {
                    name: role.title,
                    value: role.id,

                }
            });

            console.log(roleChoices)


            inquirer.prompt([
                {
                    type: "list",
                    name: "employee_id",
                    message: "Enter the id of the employee",
                    choices: employeeChoices,
                    validate: (idinput) => {
                        if (idinput) {
                            return true;
                        } else {
                            console.log("No entry detected, please try again!")
                        }
                    },
                },

                {
                    type: "list",
                    name: "role",
                    message: "Enter the employees new role id",
                    choices: roleChoices,
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
                    const sql = "UPDATE employee SET role_id = ? WHERE id = ?";
                    const params = [answers.role_id, answers.id];

                    db.query(sql, params, (err, results) => {
                        if (err) throw err;
                        console.log("Role id has been updated to    " + answers.role_id)
                        mainMenu();
                    });
                });

        })
    })
}

mainMenu();