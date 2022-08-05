const axios = require('axios');
const server = require('./src/app.js');
const { conn, Countries} = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {//crea las tablas si no existen o no hace nada si ya existe. con force true elimina la tabla y la vuelve a crear, 
  //con alter true aplica los cambios necesarios a la tabla para que coincida con el modelo, no borra los datos!
  server.listen(3001, async () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console.
    try {//se llena la base de datos por primera vez o si no existe algun registro.
      const { data } = await axios('https://restcountries.com/v3/all')
          if(data.length){
              console.log(data.length)
              const countries = await data.map((country) => {
                Countries.findOrCreate({
                  where: {
                    idCountry: country.cca3,
                    name: country.name.common,
                    continent: country.region,
                    capital: country.capital ? country.capital[0] : 'Capital no encontrada',
                    subregion: country.subregion ? country.subregion : 'Subregion no encontrada',
                    area: country.area,
                    population: country.population,
                    imagen: country.flags[1],
                  },
                });
              });
              return ('Base de Datos Country con datos.')
            } else {
              return ('No se obtuvieron datos de la API externa')
            }
    
    }catch (error) {
      console.log(error + 'en api/index.js ')
    }


  });
});
