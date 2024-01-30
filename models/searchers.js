import axios from "axios";
import 'dotenv/config'
import fs from 'fs'

export class Searchers {
    
    historial = [];
    
    constructor() {
        this.readDb()
    }
    
    get deployHistorial(){
        this.historial.forEach( (city,i) => {
            if (i < 5){
                const idx = `${i + 1}.`.green
                let cityTransform = city.split(/([ ,])/);
                let res = cityTransform.map(word => {
                    if(word !== ' ' && word !== ','){
                        return word.replace(/\b\w/g, function (match) {
                            return match.toUpperCase();
                        });
                    }else{
                        return word
                    }
                })
                res = res.join('')
                console.log(`${idx} ${res}`)
            }
        })
    }

    get paramsMapBox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es',
            'timeOut': 1000
        }
    }
    
    paramsWeather(coord){
        return{
            'appid': process.env.OPENWEATHERMAP_KEY,
            'lat': coord[0],
            'lon': coord[1],
            'units': 'metric'
        }
    }
    
    async search(place){
        
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.paramsMapBox,
                'units': 'metric'
            })
            
            const result = await instance.get();
            return result.data.features.map( place => ({
                id: place.id,
                nameCity: place.place_name,
                lgt: place.center[0],
                lat: place.center[1]
            }) )
            
        } catch (error) {
            return []
        }
        
    }
    
    async getWeather(coord){
        try {
            
            const instance = axios.create({
                baseURL:  'https://api.openweathermap.org/data/2.5/weather',
                params: this.paramsWeather(coord),
                
            })
            
            const result = await instance.get();
            const data = result.data
            return {
                status: data.weather[0].description,
                temp:(data.main.temp),
                min: (data.main.temp_min),
                max: (data.main.temp_max)
            }
            
        } catch (error) {
            throw error
        }
    }
    
    async saveToDb(city=''){
        const pathUrl = './db/db.json'
        
        if(this.historial.includes(city)){
            return;
        }
        try {
            this.historial.unshift(city.toLowerCase())
            fs.writeFileSync(pathUrl,JSON.stringify(this.historial))
        } catch (error) {
            throw error
        }
        
    }
    
    readDb(){
        const pathUrl = './db/db.json'
        try {
            if(fs.existsSync(pathUrl)){
                const data = fs.readFileSync(pathUrl, {encoding:'utf-8'})
                this.historial = JSON.parse(data)
            }
        } catch (error) {
            throw error
        }

    }

    
    
}
