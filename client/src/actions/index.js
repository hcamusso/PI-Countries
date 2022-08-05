import axios from 'axios'

export function getCountries() {
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/countries');
        return dispatch({
            type:'GET_COUNTRIES',
            payload: json.data
        })
    }
}
export function getCountriesByName(country){
    return async function (dispatch) {
        var json = await axios.get(`http://localhost:3001/countries/?name=${country}`);
            if(json.data.length === 0) {
                return alert('The country with these search data does not exist')
                
            }

       
        return dispatch({
            type:'GET_COUNTRIES_BY_NAME',
            payload: json.data
        })
    }
}
export function getDetail(id){
    return async function (dispatch) {
        var json = await axios.get(`http://localhost:3001/countries/${id}`);
        return dispatch({
            type:'GET_DETAIL',
            payload: json.data
        })
    }
}
export function oderCountries(payload){
    return {
        type: 'ORDER_COUNTRIES',
        payload: payload
    }
}
export function filterCountriesByContinent(payload){
    return {
        type: 'FILTER_COUNTRIES_BY_CONTINENT',
        payload: payload
    }
}
// todas las actividades

export function getActivities(){
    return async function(dispatch){
        let json = await axios.get('http://localhost:3001/activity');
        return dispatch ({
            type: 'GET_ACTIVITIES',
            payload: json.data
        })
    }
}
export function filterCountriesByActivity(payload){
    return {
        type: 'FILTER_COUNTRIES_BY_ACTIVITY',
        payload: payload
    }
}
// creacion de actividades 
export function postActivity(payload){
    return async function(dispatch){
        try {
            var json= await axios.post('http://localhost:3001/activity',payload);
            alert(`The activity ${json.data.name}, was created`) 
            return dispatch ({
                type: 'POST_ACTIVITIES',
                payload: json.data
            })
            
        } catch (error) {
            alert(`ERROR: The activity was not created ${error.response.data.msg}`)
        }

    }
 }
 // borrar cache de activities
 export function cleanCacheActivity(){
    return ({
        type: 'CLEAN_CACHE_ACTIVITY'
    })
    
 }