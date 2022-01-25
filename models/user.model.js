const { Sequelize, Model, DataTypes } = require('sequelize');
  const sequelize = new Sequelize.Sequelize('joaoferr_SIC_21_22_IND3', 'joaoferr_SIC_21_22_IND3', 'KLc9NMfmJvdDvMtT', {
    host: 'www.joaoferreira.eu',
    dialect: 'mysql'
})


class Users extends Model {}

Users.init({
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, { sequelize, modelName: 'users'})

  sequelize.sync().then().catch(error => {
    console.log("Error: " + error + " SYNC USER MODELS");
  })

  exports.Users = Users;