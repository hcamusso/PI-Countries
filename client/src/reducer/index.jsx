
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
        case 'DISMOUNT_DETAIL':
            return {
                ...state,
                countryDetail: []
            }
            
        case 'ORDER_COUNTRIES':
        //     document.getElementById("orderBy").selectedIndex = 0;
        // document.getElementById("filterContinent").selectedIndex = 0;
        // document.getElementById("filterActivity").selectedIndex = 0;
        let allCountriesOrder =state.filteredCountries
               
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
            }) : action.payload === 'popDesc'? allCountriesOrder.sort((a,b)=>{
                if(a.population > b.population) {return -1;}
                if(a.population < b.population) {return 1;}
                return 0;
            }) : state.countries;

            return({
                ...state,
                filteredCountries: orderedCountries
            })
        
        case 'FILTER_COUNTRIES_BY_CONTINENT':
            let allCountries =[]
            if (action.payload.filteredByActivity !== '0') {//tiene un filtro por actividad
                allCountries = state.countries.filter((e) =>
                            e.activities && e.activities.map((e) => e.name).includes(action.payload.filteredByActivity))
                } else { allCountries = state.countries 
            }

            const continentFilter = action.payload.value ==='all'? allCountries : allCountries.filter(el => el.continent === action.payload.value)
            return {
                ...state,
                filteredCountries: continentFilter
            }
        case 'FILTER_COUNTRIES_BY_ACTIVITY':
            let allCountriesByActivity =[]
            if (action.payload.filteredByContinent !== '0') {//tiene un filtro por continente
                allCountriesByActivity = state.countries.filter(el => el.continent === action.payload.filteredByContinent)
            } else {
                allCountriesByActivity = state.countries
            }
            const countriesByActivity = allCountriesByActivity.filter((e) =>
            e.activities && e.activities.map((e) => e.name).includes(action.payload.value))

            return {
                ...state,
                filteredCountries: countriesByActivity
            }
        case 'POST_ACTIVITIES':
                return {
                    ...state,
                    countries : [],
                    filteredCountries : [],
                    activities : [...state.activities, action.payload],
                }
        case 'DELETE_ACTIVITY':
                return {
                    ...state,
                }
        default:
           return state
    }
}
export default rootReducer;