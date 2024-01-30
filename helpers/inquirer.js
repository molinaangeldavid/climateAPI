import inquirer from 'inquirer'
import colors from 'colors'

const questions = [
    {
        type:  "list",
        name: "opt",
        message: 'Options',
        choices: [
            {
                name: `${'1.'.green} Search City`,
                value: 1
            },
            {
                name: `${'2.'.green} Historial`,
                value: 2
            },
            {
                name: `${'0.'.green} Exit`,
                value: 0
            }
            
        ]
    }
]

const pauseQuestions = [
    {
        type: "input",
        name: `"pause`,
        message: `Press ${'ENTER'.green} to continue.`
    }
]

export const inquirerMenu = async() => {
    console.clear()
    console.log("==============================".green)
    console.log("    Select an option".white)
    console.log("==============================".green)

    const {opt} = await inquirer.prompt(questions)
    return opt;

}

export const pause = async() => {
    await inquirer.prompt(pauseQuestions)
}

export const readInput = async(message) => {

    const question = {
        type: 'input',
        name: 'inputDes',
        message,    
        validate(value){
            if(value.length == 0){
                return 'Must write a value'
            }
            return true
        }
    }

    const {inputDes} = await inquirer.prompt(question)
    return inputDes

}

export const choiceCity = async(places = []) => {
    const choices = places.map((place,i) => {

        const idx = i + 1;
        return {
            name: `${(idx)}. `.green + place.nameCity,
            value: place.id 
        }

    })

    choices.push({
        name: '0.'.green + ' Cancel',
        value: 0
    })

    const question = {
        type: 'list',
        name: 'choicedCity',
        message: 'What city would you like to search?',
        choices: choices
    }

    const {choicedCity} = await inquirer.prompt(question)
    return choicedCity

}


