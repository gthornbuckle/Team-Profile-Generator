const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

employeesArray = []; //Array to store generated employees

inquirer.prompt([ //Questions to create a new manager
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
    const manager = new Manager(response.name, response.id, response.email, response.officeNumber); //Creates new manager
    employeesArray.push(manager); //Saves manager to employee array
    promptAddNewEmployee();
})

const promptAddNewEmployee = () => { //Prompt for adding engineer/intern or exiting
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
            promptNewEngineer();
        }
        else if (response.employeeType === 'Intern'){
            promptNewIntern();
        }
        else{
            buildPage(employeesArray);
        }
    })
}

const promptNewEngineer = () => {
    inquirer.prompt([ //Questions to create a new engineer
        {
            type: 'input',
            name: 'name',
            message: "What is your engineer's name?"
        },
        {
            type: 'input',
            name: 'id',
            message: "What is your engineer's ID?"
        },
        {
            type: 'input',
            name: 'email',
            message: "What is your engineer's email address?"
        },
        {
            type: 'input',
            name: 'github',
            message: "What is your engineer's github username?" 
        }
    ]).then(response => {
        const engineer = new Engineer(response.name, response.id, response.email, response.github);
        employeesArray.push(engineer);
        promptAddNewEmployee();
    })
}

const promptNewIntern = () => {
    inquirer.prompt([ //Questions to create a new intern
        {
            type: 'input',
            name: 'name',
            message: "What is your intern's name?"
        },
        {
            type: 'input',
            name: 'id',
            message: "What is your intern's ID?"
        },
        {
            type: 'input',
            name: 'email',
            message: "What is your intern's email address?"
        },
        {
            type: 'input',
            name: 'school',
            message: "What is your intern's school?"
        }
    ]).then(response => {
        const intern = new Intern(response.name, response.id, response.email, response.school);
        employeesArray.push(intern);
        promptAddNewEmployee();
    })
}

const writeToFile = html => { //function to write html to file
    fs.writeFile(outputPath, html, (err) =>
    err ? console.log(err) : console.log('File created successfully.')
  );
}

const buildPage = team => {
    writeToFile(render(team)); //Creates html using employee array
}
