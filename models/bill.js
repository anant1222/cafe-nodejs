const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bill', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    uuid: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    contactNumber: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    paymentMethod: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productDetails: {
      type: DataTypes.JSON,
      allowNull: true
    },
    createdBy: {
      type: DataTypes.STRING(15),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'bill',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
