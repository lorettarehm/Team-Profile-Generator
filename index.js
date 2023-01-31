const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.
inquirer.prompt([
    {
        type: 'input',
        message: 'What is the name of the team manager?',
        name: 'managerName'
    }, {
        type: 'input',
        message: 'What is the employee ID of the team manager?',
        name: 'managerID'
    }, {
        type: 'input',
        message: 'What is the email of the team manager?',
        name: 'managerEmail'
    }, {
        type: 'input',
        message: 'What is the office number of the team manager?',
        name: 'managerOfficeNumber'
    },
]).then((response) => {
    const manager = new Manager(response.managerName, response.managerID, response.managerEmail);
    manager.setOfficeNumber(response.managerOfficeNumber);

    console.log(manager);
    // Render the page
    const pageRender = render([manager, manager, manager]);

    // Write page on file
    fs.writeFile(outputPath, pageRender, (err) =>
    err ? console.error(err) : console.log('Success!')
    );

});
