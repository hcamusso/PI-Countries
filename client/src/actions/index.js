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

export function oderCountries(payload){
    return {
        type: 'ORDER_COUNTRIES',
        payload
    }
}
export function filterCountriesByContinent(payload){
    return {
        type: 'FILTER_COUNTRIES_BY_CONTINENT',
        payload
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
        payload
    }
}