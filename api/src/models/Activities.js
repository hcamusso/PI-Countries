const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activities', {
    ID:{
      type: DataTypes.UUID,
      allowNull:false,
      unique: true,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    dificultad:{
      type: DataTypes.ENUM('1', '2', '3', '4', '5'),
      allowNull: false
    },
    duracion:{
      type: DataTypes.ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10'),  
      allowNull: false
    },
    temporada:{
      type: DataTypes.ENUM('Verano', 'Otoño', 'Invierno', 'Primavera'),
      allowNull: false
    }
  });
};