import { inquirerMenu,pause,readInput, choiceCity} from "./helpers/inquirer.js";
import { Searchers } from "./models/searchers.js";
import colors from 'colors'

const main = async() => {


    let opt;
    const places = new Searchers()
    do {

        opt = await inquirerMenu();
        switch(opt){
            case 1:
                const inputCity = await readInput('Input a city: ')
                const cities = await places.search(inputCity)
                
                const id = await choiceCity(cities)
                if (id != 0){
                    const theCity = cities.find(c => c.id === id)
    
                    // const weather = await places.getWeather([theCity.lat,theCity.lgt])
                    places.saveToDb(theCity.nameCity)
                    console.log('\nInformation of the city\n'.blue)
    
                    console.log('City: ', theCity.nameCity)
                    console.log('Lat: ', theCity.lat)
                    console.log('Lon: ', theCity.lgt)
                    // console.log('Status: ', weather.status)
                    // console.log('Temperature: ', weather.temp, '°C')
                    // console.log('Minimum: ', weather.min, '°C')
                    // console.log('maximum: ', weather.max, '°C')
                    console.log()
                }
                break;
            case 2: 
                places.deployHistorial
            }
        if (opt != 0){
            await pause()
        }
        
    } while (opt != 0);



}

main()



