import { DB } from "./types"; // Adjust the import based on your types structure

module.exports = (db: DB): void => {
  console.log("Checking available models...");
  console.log("Available models:", Object.keys(db));

  // Definition of associations (relationships)
  db.users.hasMany(db.carts, { foreignKey: "user_id" });
  db.carts.belongsTo(db.users, { foreignKey: "user_id" });

  db.users.hasMany(db.purchases, { foreignKey: "user_id" });
  db.purchases.belongsTo(db.users, { foreignKey: "user_id" });

  db.users.hasMany(db.inventories, { foreignKey: "user_id" });
  db.inventories.belongsTo(db.users, { foreignKey: "user_id" });

  db.carts.hasMany(db.cart_products, { foreignKey: "cart_id" });
  db.cart_products.belongsTo(db.carts, { foreignKey: "cart_id" });

  db.cart_products.hasOne(db.purchases, { foreignKey: "cart_product_id" });
  db.purchases.belongsTo(db.cart_products, { foreignKey: "cart_product_id" });

  db.products.hasMany(db.cart_products, { foreignKey: "product_id" });
  db.cart_products.belongsTo(db.products, { foreignKey: "product_id" });

  db.inventories.hasMany(db.inventory_products, { foreignKey: "inventory_id" });
  db.inventory_products.belongsTo(db.inventories, { foreignKey: "inventory_id" });

  db.products.hasMany(db.inventory_products, { foreignKey: "product_id" });
  db.inventory_products.belongsTo(db.products, { foreignKey: "product_id" });

  db.categories.hasMany(db.products, { foreignKey: "category_id" });
  db.products.belongsTo(db.categories, { foreignKey: "category_id" });

  db.products.hasMany(db.product_resources, { foreignKey: "product_id" });
  db.product_resources.belongsTo(db.products, { foreignKey: "product_id" });

  db.products.hasMany(db.product_category, { foreignKey: "product_id" });
  db.product_category.belongsTo(db.products, { foreignKey: "product_id" });

  db.categories.hasMany(db.product_category, { foreignKey: "category_id" });
  db.product_category.belongsTo(db.categories, { foreignKey: "category_id" });

  console.log("Associations successfully established.");
};
