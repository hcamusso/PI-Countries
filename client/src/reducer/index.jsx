const initialState = {
    countries : [],
    filteredCountries : [],
    countryDetail: [],
    activities : []
   }
  
function  rootReducer (state = initialState, action) {
    switch (action.type) {
        case 'GET_ACTIVITIES':
            return {
                ...state,
                activities: action.payload
            }
        case 'GET_COUNTRIES':
            return {
                ...state,
                countries: action.payload,
                filteredCountries: action.payload
            }
        case 'GET_COUNTRIES_BY_NAME':
            return {
                ...state,
                filteredCountries: action.payload
            }
        case 'GET_DETAIL':
            return {
                ...state,
                countryDetail: action.payload
            }
        case 'ORDER_COUNTRIES':
            const allCountriesOrder = state.countries
            
            const orderedCountries = action.payload === 'asc'? allCountriesOrder.sort((a,b)=>{
                if(a.name.toLowerCase() > b.name.toLowerCase()) return 1
                if(a.name.toLowerCase() < b.name.toLowerCase()) return -1
            }) : action.payload === 'desc'? allCountriesOrder.sort((a,b)=>{
                if(a.name.toLowerCase() > b.name.toLowerCase()) return -1
                if(a.name.toLowerCase() < b.name.toLowerCase()) return 1
            }) : action.payload === 'popAsc'? allCountriesOrder.sort((a,b)=>{
                if(a.population > b.population) return 1
                if(a.population < b.population) return -1
            }) : allCountriesOrder.sort((a,b)=>{
                if(a.population > b.population) return -1
                if(a.population < b.population) return 1
            })

            return({
                ...state,
                countries: orderedCountries,
                filteredCountries: orderedCountries
            })
        
        case 'FILTER_COUNTRIES_BY_CONTINENT':
            const allCountries = state.countries
            const continentFilter = action.payload ==='all'? allCountries : allCountries.filter(el => el.continent === action.payload)
            return {
                ...state,
                filteredCountries: continentFilter
            }
        case 'FILTER_COUNTRIES_BY_ACTIVITY':
            const allCountriesByActivity = state.countries
            console.log('allCountriesByActivity',allCountriesByActivity)
            console.log(action.payload)
 
            const countriesByActivity = allCountriesByActivity.filter((e) =>
            e.activities && e.activities.map((e) => e.name).includes(action.payload))
            console.log('countriesByActivity',countriesByActivity)
            return {
                ...state,
                filteredCountries: countriesByActivity
            }

        default:
           return state
    }
}
export default rootReducer;