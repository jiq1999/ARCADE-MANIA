const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('genres', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }                           //no es necesario agregar id, lo genera automaticamente y no pisa con nada
  });
};
