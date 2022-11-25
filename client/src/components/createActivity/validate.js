export function validate(input) {
    
      
        // name: "",OBLIGATORIO, UNICO
        // dificultad: "",('1', '2', '3', '4', '5')OBLIGATORIO
        // duracion: "",('1', '2', '3', '4', '5', '6', '7', '8', '9', '10')OBL
        // temporada: "",('Verano', 'Otoño', 'Invierno', 'Primavera')OBL
        // countries:[] OBLIGATORIO
        let errors = {};
        if (!input.name) {
            errors.name = 'Tourist activity is required';
        } else if(!/^([a-zA-Z]+)(\s[a-zA-Z]+)*$/.test(input.name)) {
            errors.name = 'Tourist activity requires only letters'
        }
        //falta controlar que sea unico el name
        if (!input.dificultad) {
            errors.dificultad = 'Difficulty is required';
        } else if (input.dificultad < 1 || input.dificultad > 5) {
            errors.dificultad = 'Difficulty must be enter 1 and 5 inclusive';
        } 
        if (!input.duracion) {
            errors.duracion = 'Duration is required';
        } else if (input.duracion < 1 || input.duracion > 10) {
            errors.duracion = 'Duration must be enter 1 and 10 inclusive';
        } 
        if (!input.temporada) {
            errors.temporada = 'Season is required';
        } 
        if (input.countries.length === 0) {
            errors.countries ='You must select at least one country';
        } 
        
        
        return errors;
    }