var DataTypes = require("sequelize").DataTypes;
var _category = require("./category");
var _product = require("./product");
var _user = require("./user");

function initModels(sequelize) {
  var category = _category(sequelize, DataTypes);
  var product = _product(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);


  return {
    category,
    product,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
