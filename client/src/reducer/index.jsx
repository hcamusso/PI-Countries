
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
            
               const firstorderedCountries =  action.payload.sort((a,b) => {
                if(a.name > b.name) {return 1;}
                if(a.name < b.name) {return -1;}
                return 0;
            });

            return {
                ...state,
                countries: firstorderedCountries,
                filteredCountries: firstorderedCountries
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
                if(a.name > b.name) {return 1;}
                if(a.name < b.name) {return -1;}
                return 0;
            }) : action.payload === 'desc'? allCountriesOrder.sort((a,b)=>{
                if(a.name > b.name) {return -1;}
                if(a.name < b.name) {return 1;}
                return 0;
            }) : action.payload === 'popAsc'? allCountriesOrder.sort((a,b)=>{
                if(a.population > b.population) {return 1;}
                if(a.population < b.population) {return -1;}
                return 0;
            }) : allCountriesOrder.sort((a,b)=>{
                if(a.population > b.population) {return -1;}
                if(a.population < b.population) {return 1;}
                return 0;
            })
            return({
                ...state,
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
 
            const countriesByActivity = allCountriesByActivity.filter((e) =>
            e.activities && e.activities.map((e) => e.name).includes(action.payload))

            return {
                ...state,
                filteredCountries: countriesByActivity
            }
        case 'POST_ACTIVITIES':
                return {
                    ...state,
                    countries: [],
                    activities : [...state.activities, action.payload],
                }

        default:
           return state
    }
}
export default rootReducer;