const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const questions = require('./src/questions')();

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

const teamList = [];

// TODO: Write Code to gather information about the development team members, and render the HTML file.
// Function to render the team
function renderAndWriteTeam(team) { // Render the page
    const pageRender = render(team);
    console.log(outputPath);
    console.log(pageRender);
    // Write page on file
    fs.writeFile(outputPath, pageRender, (err) => err ? console.error(err) : console.log('Success!'));
};

// Main logic flow
const init = async () => {
    let continueProgram = true;
    // Manager questions
    const managerQuestions = await questions.managerQuestions();
    console.log(managerQuestions);
    const manager = new Manager(managerQuestions.managerName, managerQuestions.managerID, managerQuestions.managerEmail, managerQuestions.managerOfficeNumber);
    teamList.push(manager);

    // Check if user wants to keep adding employees
    while (continueProgram) {
        const menuQuestion = await questions.menuQuestion();
        console.log("menuQuestion.action: " + menuQuestion.action);

        if (menuQuestion.action === "engineer") {
            const engineerQuestions = await questions.engineerQuestions();
            console.log(engineerQuestions);
            const engineer = new Engineer(engineerQuestions.engineerName, engineerQuestions.engineerID, engineerQuestions.engineerEmail, engineerQuestions.engineerGithub);
            teamList.push(engineer);
        } else if (menuQuestion.action === "intern") {
            const internQuestions = await questions.internQuestions();
            console.log(internQuestions);
        } else { // User wants to end the program
            continueProgram = false;
            console.log('Exiting program.')
        }
    }

    // Render list once user finished adding employees
    console.log(teamList);
    renderAndWriteTeam(teamList);
};

init();

// ----------------------------------------------------------------
// const menu = () => {
//     console.log("MENU");
//     const options = [{
//             type: "list",
//             name: "action",
//             message: "What do you want to do?",
//             choices: [
//                 {
//                     name: "Add an engineer",
//                     value: "engineer"
//                 }, {
//                     name: "Add an intern",
//                     value: "intern"
//                 }, {
//                     name: "Finish building the team",
//                     value: "quit"
//                 }
//             ]
//         }];
//     return inquirer.prompt(options);
// };

// function main() {
//     inquirer.prompt([
//         {
//             type: 'input',
//             message: 'What is the name of the team manager?',
//             name: 'managerName'
//         }, {
//             type: 'input',
//             message: 'What is the employee ID of the team manager?',
//             name: 'managerID'
//         }, {
//             type: 'input',
//             message: 'What is the email of the team manager?',
//             name: 'managerEmail'
//         }, {
//             type: 'input',
//             message: 'What is the office number of the team manager?',
//             name: 'managerOfficeNumber'
//         },
//     ]).then((response) => {
//         const manager = new Manager(response.managerName, response.managerID, response.managerEmail);
//         manager.setOfficeNumber(response.managerOfficeNumber);
//         teamList.push(manager);
//         programLoop();
//     });
// };

// const programLoop = async () => {
//     while (continueProgram) {
//         await menu().then(option => {
//             if (option.action === 'engineer') {
//                 // return
//                 const checkOK = new Promise((option, reject) => {addEngineer()});
//                 console.log('Engineer added: '+ checkOK + " | continueProgram? " + continueProgram);
//             } else if (option.action === 'inter') {
//                 // const checkOK = new Promise((option, reject) => {addEngineer()});
//                 console.log("continueProgram? " + continueProgram);
//             } else {
//                 console.log('Exiting program.')
//                 console.log("continueProgram? " + continueProgram);
//                 continueProgram = false;
//                 console.log("continueProgram? " + continueProgram);
//                 renderTeam(teamList);
//                 // process.exit(0);
//             }
//         // }).then((data) => {
//         //     console.log(util.inspect(data, {
//         //         showHidden: false,
//         //         depth: null
//         //     }));
//         }).catch((error, option) => {
//             console.error('Error:', error);
//         });
//         console.log('End of while loop');
//     }
// };

// function addEngineer() {
//     inquirer.prompt([
//         {
//             type: 'input',
//             message: 'What is the name of the engineer?',
//             name: 'engineerName'
//         }, {
//             type: 'input',
//             message: 'What is the employee ID of the engineer?',
//             name: 'engineerID'
//         }, {
//             type: 'input',
//             message: 'What is the email of the engineer?',
//             name: 'engineerEmail'
//         }, {
//             type: 'input',
//             message: 'What is the engineer\'s GitHub username?',
//             name: 'engineerGithub'
//         },
//     ]).then((response) => {
//         const engineer = new Engineer(response.engineerName, response.engineerID, response.engineerEmail, response.engineerGithub);
//         teamList.push(engineer);
//         console.log(engineer);
//     });
//     return true;
// };


// main();
