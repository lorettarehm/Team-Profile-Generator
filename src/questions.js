const inquirer = require('inquirer');
// inquirer.registerPrompt('search-list', require('inquirer-search-list'));

module.exports = () => {
    return {
        menuQuestion : () => {
            const question = [
                {
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
                }
            ]
            return inquirer.prompt(question)
        
        },

        managerQuestions : () => {
            const questions = [
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
                }
            ]
            return inquirer.prompt(questions)
        
        },

        engineerQuestions : () => {
            const questions = [
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
                }
            ]
            return inquirer.prompt(questions)
        
        },
    
        internQuestions : () => {
            const questions = [
                {
                    type: 'input',
                    message: 'What is the name of the intern?',
                    name: 'internName'
                }, {
                    type: 'input',
                    message: 'What is the employee ID of the intern?',
                    name: 'internID'
                }, {
                    type: 'input',
                    message: 'What is the email of the intern?',
                    name: 'internEmail'
                }, {
                    type: 'input',
                    message: 'What is the intern\'s school?',
                    name: 'internSchool'
                }
            ]
            return inquirer.prompt(questions)
        
        }
    };
};