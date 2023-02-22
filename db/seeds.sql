INSERT INTO department (name)
VALUES
("Engineering"),
("Finance"),
("Legal"),
("Sales");

INSERT INTO role (title, salary, department_id)
VALUES
("Software Engineering Manager", 160000, 1),
("Software Engineer", 120000, 1),
(" Finance Manager", 155000, 2),
("Accountant", 110000, 2),
("Finance Officer", 80000, 2),
("Legal Manager", 160000, 3 ),
("Lawyer", 120000, 3),
("Legal Administration Officer", 75000, 3),
("Sales Manager", 105000, 4),
("Salesperson", 85000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Jane", "Smith", 1, NULL),
("John", "Doe",2, 1),
("George", "Jeffrey", 1, NULL),
("Cecil", "Taylor", 3, 2),
("Brad", "Orr",4, 2),
("Pam", "Strong", 1, NULL),
("Harold", "Bartlett",5, 3),
("Rick", "Gates", 6, 3),
("Cornelius", "Anthony", 1, NULL),
("Kim", "Donovan", 7, 4);
