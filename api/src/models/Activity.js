const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Activity', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.ENUM("1", "2", "3", "4", "5"),
      allowNull: false
    },
    duration: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true
      }
    },
    season: {
      type: DataTypes.ENUM("Autumn", "Summer", "Winter", "Spring"),
      // allowNull: false
    },
  },{
    tableName: "Activities",
    timestamps: false,
    createdAt: false
  });
};

/*
  Actividad Turística con las siguientes propiedades:
    - ID
    - Nombre
    - Dificultad (Entre 1 y 5)
    - Duración
    - Temporada (Verano, Otoño, Invierno o Primavera)
*/