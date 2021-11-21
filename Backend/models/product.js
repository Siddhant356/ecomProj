module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    productName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  Product.associate = (models) => {
    Product.belongsTo(models.ProductCategory, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  Product.associate = (models) => {
    Product.hasMany(models.OrderDetail);
  };

  return Product;
};
