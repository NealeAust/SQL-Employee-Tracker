# SQL Employee Tracker

[![License: MIT](https://img.shields.io/badge/license-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Project Summary
To build a command-line application to manage a company's database, using Node.js, Inquirer, and mySQL. A list of required 
functionality is provided with code to be written to display, add and update information, which is to be stored in tables. 
The project involves enabling a number of packages/programs to interface effectively. To include a walkthrough that demonstrates 
the functionality of the application and how it is invoked from the command-line.

## Video

The following video shows the user flow through the application., including all prompts and updated tables:

https://drive.google.com/file/d/1E16Faz8K0tLzjctdepVUgXaLNSHed7cq/view

## Packages Used

- Node.js: Executes JavaScript code outside a web browser.
- MySql: A relational database management system based on structured query language (SQL).     
- console.table: A method that prints an array of objects as a table.                                                       
- Inquirer: Provides a logical and straightforward way to capture user input in a Node.js command line interface application.

## SQL Employee Tracker

The SQL Employee Tracker is an easy-to-use command-line application that enables the business owner to view and manage the 
departments, roles, and employees in their company. It's functional structure ensures it is a critical tool to enable the 
owner to organize and plan their business. The application has a list of functions displayed in a drop-down menu. Upon selecting an 
option from the main menu, either a table is displayed or the user is prompted to enter a response or select from a choice list. 
The user can then view the relevant table to ensure the record has been added or updated.

The application includes SQL database named **employee_db** containing the following three tables:
- department
- role
- employee

## Project Description

The objective of this project was **not** just to produce an employee management system, it was to effectively create an application 
in which **MySql** and **Node.js** could work together (interface). The application contained various packages (listed above) that have
to connect and communicate with each other to produce a functional command-line application.

The following Main Menu was provided in the project brief (README):

- View all departments,
- View all roles,
- View all employees,
- Add a department,
- Add a role,
- Add an employee,
- Update an employee role.

The project required coding to be written for each menu option.

The project also required coding to be written for the following files:

- schema.sql,
- seeds.sql,
- connection.js,
- index.js,
- package.json (updates or fields added).

## Installation

To install this application, simply download from Github.

## Usage

To access and run the program the user must enter the follwing commands in order:

1. At index.js right click and select Open in Integrated Terminal,
2. At $ prompt type in mysql -u root -p,
3. At Enter password prompt type in password,
4. At mysql prompt type in source db/schema.sql,
5. At mysql prompt type in source db/seeds.sql,
6. At mysql prompt type in quit,
7. At *$* prompt type in *npm run start*,

This opens the application with the user being presented with main menu as listed in the *Project Description* section above. 
To use the application the user selects a menu option and if required enter a value or select from a choice list.

## Licence

MIT








