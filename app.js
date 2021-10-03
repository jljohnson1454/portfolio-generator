const inquirer = require('inquirer');
// const fs = require('fs');
// const generatePage = require('./src/page-template.js');

// const pageHTML = gneratePage(name, github);


// // const printProfileData = profileDataArr => {
// //   // This...
// //   for (let i = 0; i < profileDataArr.length; i += 1) {
// //     console.log(profileDataArr[i]);
// //   }

// //   console.log('================');

// //   // Is the same as this...
// //   profileDataArr.forEach(profileItem => console.log(profileItem));
// // };

// // printProfileData(profileDataArgs);



// fs.writeFile('./index.html', pageHTML, err => {
//   if(err) throw err;

//     console.log('Portfolio complete! Check out index.html to see the output!');
// });

const promptUser = () => {
    return inquirer
    .prompt([
        {
            type:'input',
            name:'name',
            message: 'What is your name? (Required)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your github username',
            validate: gitInput => {
                if(gitInput) {
                    return true;
                } else {
                    console.log('Please enter your user name! (Required)');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About" section?',
            default: true
        },
        {
            type: 'input',
            name:'about',
            message: 'Provide some information about yourself',
            when: ({ confirmAbout}) => {
                if (confirmAbout) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ]);
};

const promptProject = portfolioData => {
    
    portfolioData.projects =[];

    if (!portfolioData.projects) {
        portfolioData.projects =[];
    }

    console.log(`
    
    =================
    Add a New Project
    =================`);
    return inquirer.prompt([
        {
            type: 'input',
            name:'name',
            message: 'What is the name of your project? (Required)',
            validate: projInput => {
                if(projInput) {
                    return true;
                } else {
                    console.log('Please enter your project name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)',
            validate: projdescInput => {
                if(projdescInput) {
                    return true;
                } else {
                    console.log('Please enter description!');
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['Javascript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the Github link to your project. (Required)',
            validate: linkInput => {
                if(linkInput) {
                    return true;
                } else {
                    console.log('Please enter Github link!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }

    ])
    
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if(projectData.confirmAddProject) {
            return promptProject(portfolioData);
        } else{
            return portfolioData;
        }
        })    
    

    
};

promptUser()
    .then(promptProject)
    .then(portfolioData => {
        console.log(portfolioData);
    })
