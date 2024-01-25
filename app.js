import { inquirerMenu,pause,readInput } from "./helpers/inquirer.js";

const main = async() => {


    let opt;
    do {

        opt = await inquirerMenu();

        
        switch(opt){
            case 1:
                const inputCity = await readInput('Input a city: ')
                break;
                case 2: 
                
                break;
            }
        if (opt != 0){
            await pause()
        }
        
    } while (opt != 0);



}

main()



