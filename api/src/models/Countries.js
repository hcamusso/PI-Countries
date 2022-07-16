const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('countries', {
    idCountry:{
      type: DataTypes.STRING(3),
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    imagen:{ 
      type: DataTypes.TEXT, 
      validate: {isUrl: true}
    },
    continent:{
      type: DataTypes.STRING,
    },
    capital:{
      type: DataTypes.STRING,
    },
    subregion:{
      type: DataTypes.STRING,

    },
    area:{
      type: DataTypes.REAL,
    },
    population:{
      type: DataTypes.INTEGER,
    }
  });
};
