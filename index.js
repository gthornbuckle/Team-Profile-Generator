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
        name: 'name',
        message: "What is your manager's name?"
    },
    {
        type: 'input',
        name: 'id',
        message: "What is your manager's ID?"
    },
    {
        type: 'input',
        name: 'email',
        message: "What is your manager's email address?"
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: "What is your manager's office number?" 
    }
]).then(response => {
    // populate manager info
    promptAddNewEmployee();
})

const promptAddNewEmployee = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'Which type of team member do you want to add?',
            name: 'employeeType',
            choices: ['Engineer', 'Intern', 'Exit'],
            suffix: ' (Use arrow keys to choose an option)'
        }
    ]).then(response => {
        if (response.employeeType === 'Engineer'){
           console.log('Engineer selected');
        }
        else if (response.employeeType === 'Intern'){
            console.log('Intern selected');
        }
        else{
            console.log('Build Page');
        }
    })
}

// const promptForEngineer = () => {
//     inquirer.prompt([{
//         //engineer questions
//     }]).then(response => {
//         // add new engineer to employees array
//         // promptForNextEmployee
//     })
// }

// const promptForIntern = () => {
//     inquirer.prompt([{
//         //intern questions
//     }]).then(response => {
//         // add new intern to employees array
//         // promptForNextEmployee
//     })
// }

// const buildPage = () => {

// }
