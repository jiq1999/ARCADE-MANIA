const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID, //UUID = genero id random para evitar que pise con la id de la api
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      defaultValue: "https://i.imgur.com/2QBi8eF.jpg",
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,   //o .DATE?
      allowNull: true,
    },
    rating: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    platform: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    fromDB: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  });
};
