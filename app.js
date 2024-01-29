import { inquirerMenu,pause,readInput } from "./helpers/inquirer.js";
import { Searchers } from "./models/searchers.js";
import colors from 'colors'

const main = async() => {


    let opt;
    do {

        opt = await inquirerMenu();
        const places = new Searchers()
        console.log(places.historial)
        switch(opt){
            case 1:
                const inputCity = await readInput('Input a city: ')
                await places.search(inputCity)
                console.log(inputCity)
                console.log('\nInformation of the city\n'.blue)

                console.log('City: ', )
                console.log('Lat: ', )
                console.log('Lon: ', )
                console.log('Temperature: ', )
                console.log('Minimum: ', )
                console.log('maximum: ', )
                console.log()
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



