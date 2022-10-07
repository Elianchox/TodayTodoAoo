
import axios from 'axios';
const URL = "https://catfact.ninja/facts?limit=";

export const ApiCat = {
    getCats:async(amount)=>{
        return await axios.get(URL+amount).then(res=>{
            return res.data.data
        }).catch(error=>{
            console.error(error)
        })
    }
}