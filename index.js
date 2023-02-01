const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

const teamList = [];

const continueProgram = true;

// TODO: Write Code to gather information about the development team members, and render the HTML file.
const menu = () => {
    console.log("MENU");
    const options = [{
            type: "list",
            name: "action",
            message: "What do you want to do?",
            choices: [
                {
                    name: "Add an engineer",
                    value: "engineer"
                }, {
                    name: "Add an intern",
                    value: "intern"
                }, {
                    name: "Finish building the team",
                    value: "quit"
                }
            ]
        }];
    return inquirer.prompt(options);
};

const main = async () => {
    addManager();
    while (continueProgram) {
        await menu().then(option => {
            if (option.action === 'engineer') {
                return Promise.resolve(addEngineer());
            } else if (option.action === 'inter') {
                return Promise.resolve(addIntern());
                // return new Promise((resolve, reject) => {
                //     inquirer.prompt([{
                //             type: 'input',
                //             name: 'secretCode',
                //             message: "Enter a secret code:"
                //         }]).then(answers => {
                //         resolve(answers);
                //     })
                // });
            } else {
                console.log('Exiting program.')
                renderTeam(teamList);
                process.exit(0);
            }
        // }).then((data) => {
        //     console.log(util.inspect(data, {
        //         showHidden: false,
        //         depth: null
        //     }));
        }).catch((error, option) => {
            console.error('Error:', error);
        });
    }
};

function addManager() {
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
        teamList.push(manager);
    });
};


function addEngineer() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the engineer?',
            name: 'engineerName'
        }, {
            type: 'input',
            message: 'What is the employee ID of the engineer?',
            name: 'engineerID'
        }, {
            type: 'input',
            message: 'What is the email of the engineer?',
            name: 'engineerEmail'
        }, {
            type: 'input',
            message: 'What is the engineer\'s GitHub username?',
            name: 'engineerGithub'
        },
    ]).then((response) => {
        const engineer = new Engineer(response.engineerName, response.engineerID, response.engineerEmail, response.engineerGithub);
        team.push(engineer);
        console.log(engineer);
    });
};

function renderTeam(team) { // Render the page
    const pageRender = render(team);

    // Write page on file
    fs.writeFile(outputPath, pageRender, (err) => err ? console.error(err) : console.log('Success!'));
};
