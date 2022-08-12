import axios from 'axios'
// voy a transformar la accion getCountries en 3 acciones> una accion para comenzar el get, una accion para informar que se termino y una accion para
// informar q fallo

export function startGetCountries(){

}
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
        try {
            
            var json = await axios.get(`http://localhost:3001/countries/?name=${country}`);
            console.log(json.data.length)
     
            return dispatch({
                type:'GET_COUNTRIES_BY_NAME',
                payload: json.data
            })
        } catch (error) {
            alert(`ERROR: Not exist a country ${error.response.data.msg}`)
        }
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

export function dismountDetail(){
    return ({
        type:'DISMOUNT_DETAIL'
    })
}
export function oderCountries(payload){
    return {
        type: 'ORDER_COUNTRIES',
        payload: payload
    }
}
export function filterCountriesByContinent(value, filteredByContinent, filteredByActivity){
    console.log('action', value, filteredByContinent, filteredByActivity)
    return {
        type: 'FILTER_COUNTRIES_BY_CONTINENT',
        payload: {value, filteredByContinent, filteredByActivity}
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
export function filterCountriesByActivity(value, filteredByContinent, filteredByActivity){
    return {
        type: 'FILTER_COUNTRIES_BY_ACTIVITY',
        payload: {value, filteredByContinent, filteredByActivity}
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
 //dispatch(deleteActivity())
    export function deleteActivity(idCountry,ID){
        return async function(dispatch){
            try {
                var json= await axios.delete(`http://localhost:3001/activity/${idCountry}/${ID}`);
                alert(`The activity of ${json.data.name}, was deleted`) 
                return dispatch ({
                    type: 'DELETE_ACTIVITY',
                    payload: json.data
                })
                
            } catch (error) {
                alert(`ERROR: The activity was not deleted ${error.response.data.msg}`)
            }

        }
     }
