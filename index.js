// Imported packages needed for this application
const inquirer = require("inquirer");
require("console.table");

// Connection code held in a separate file
const db = require("./connection.js");

// Created empty array to store user input
const employees = [];

console.log("**************************************")
console.log("*                                    *")
console.log("*        EMPLOYEE MANAGER            *")
console.log("*                                    *")
console.log("**************************************")


// Main menu displays list for user to select function to perform
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
// functions to display information in tables as requested
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

// Require user reponding to questions 
// Validates performed & returns error message if no entry detected
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

// Following functions require user to select from a choice list
// Include prompts for department, roles and employee names
function addRole() {
    db.query("SELECT * FROM department", (err, results) => {
        if (err) throw err;

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
                validate: roleSelect => {
                    if (roleSelect) {
                        return true;
                    } else {
                        return console.log("No entry detected, please try again!");
                    }
                },
            },

            // Role information includes salary
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

                    console.log("**************************************");
                    console.log("Added " + answers.role + " to roles!");
                    console.log("**************************************");

                    mainMenu()
                });
            })
    })
}

function addEmployee() {

    db.query("SELECT * FROM role", (err, results) => {
        if (err) throw err;
        const roleChoices = results.map((role) => {
            return {
                name: role.title,
                value: role.id,
            }
        });
        console.log(roleChoices)

        db.query("SELECT * FROM employee", (err, results) => {
            if (err) throw err;
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
                    message: "Enter the employee's first name.",
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
                    message: "Enter the employee's last name.",
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
                    name: "role_id",
                    message: "Select employees role.",
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
                    message: "Select employees manager.",
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

                        console.log("**************************************");
                        console.log("Employee " + answers.first_name + answers.last_name + " has been added!")
                        console.log("**************************************");

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
            const updateRoleChoices = results.map((role) => {
                return {
                    name: role.title,
                    value: role.id,

                }
            });
            console.log(updateRoleChoices)

            inquirer.prompt([
                {
                    type: "list",
                    name: "employee_id",
                    message: "Select employee.",
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
                    name: "role_id",
                    message: "Select role.",
                    choices: updateRoleChoices,
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
                    const params = [answers.role_id, answers.employee_id];

                    db.query(sql, params, (err, results) => {
                        if (err) throw err;

                        console.log("**************************");
                        console.log("* Role has been updated! *");
                        console.log("**************************");

                        mainMenu();
                    });
                });

        })
    })
}

mainMenu();