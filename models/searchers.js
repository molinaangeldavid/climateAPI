import axios from "axios";
import 'dotenv/config'

export class Searchers {
    
    historial = ['Buenos Aires', 'Asuncion', 'Cordoba'];
    
    constructor() {
        
    }
    
    get paramsMapBox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es',
            'timeOut': 1000
        }
    }
    
    async search(place){
        
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.paramsMapBox
            })
            
            const result = await instance.get();
            console.log(result.data)
            
        } catch (error) {
            return []
        }
        
        
        
        
        return []
        
    }
    
}
