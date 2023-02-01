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
    // Write page on file
    fs.writeFile(outputPath, pageRender, (err) => err ? console.error(err) : console.log('Success!'));
};

// Main logic flow
const init = async () => {
    let continueProgram = true;
    // Manager questions
    const managerQuestions = await questions.managerQuestions();
    const manager = new Manager(managerQuestions.managerName, managerQuestions.managerID, managerQuestions.managerEmail, managerQuestions.managerOfficeNumber);
    teamList.push(manager);

    // Check if user wants to keep adding employees
    while (continueProgram) {
        const menuQuestion = await questions.menuQuestion();

        if (menuQuestion.action === "engineer") {
            const engineerQuestions = await questions.engineerQuestions();
            const engineer = new Engineer(engineerQuestions.engineerName, engineerQuestions.engineerID, engineerQuestions.engineerEmail, engineerQuestions.engineerGithub);
            teamList.push(engineer);
        } else if (menuQuestion.action === "intern") {
            const internQuestions = await questions.internQuestions();
            const intern = new Intern(internQuestions.internName, internQuestions.internID, internQuestions.internEmail, internQuestions.internSchool);
            teamList.push(intern);
        } else { // User wants to end the program
            continueProgram = false;
        }
    }

    // Render list once user finished adding employees
    renderAndWriteTeam(teamList);
};

init();