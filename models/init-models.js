var DataTypes = require("sequelize").DataTypes;
var _category = require("./category");
var _product = require("./product");
var _user = require("./user");
var _bill = require("./bill");

function initModels(sequelize) {
  var category = _category(sequelize, DataTypes);
  var product = _product(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var bill = _bill(sequelize, DataTypes);


  return {
    category,
    product,
    user,
    bill
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
