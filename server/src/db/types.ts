import { ModelDefined } from 'sequelize';
import { UserAttributes, UserCreationAttributes } from './models/user';
import { CartAttributes, CartCreationAttributes } from './models/cart';
import { ProductAttributes, ProductCreationAttributes } from './models/product';
import { CategoryAttributes, CategoryCreationAttributes } from './models/category';
import { CartProductAttributes, CartProductCreationAttributes } from './models/cart_product';
import { PurchaseAttributes, PurchaseCreationAttributes } from './models/purchase';
import { InventoryAttributes, InventoryCreationAttributes } from './models/inventory';
import { InventoryProductAttributes, InventoryProductCreationAttributes } from './models/inventory_product';
import { ProductCategoryAttributes, ProductCategoryCreationAttributes } from './models/product_category';
import { ProductResourceAttributes, ProductResourceCreationAttributes } from './models/product_resources';

export interface DB {
  users: ModelDefined<UserAttributes, UserCreationAttributes>;
  carts: ModelDefined<CartAttributes, CartCreationAttributes>;
  products: ModelDefined<ProductAttributes, ProductCreationAttributes>;
  categories: ModelDefined<CategoryAttributes, CategoryCreationAttributes>;
  cart_products: ModelDefined<CartProductAttributes, CartProductCreationAttributes>;
  purchases: ModelDefined<PurchaseAttributes, PurchaseCreationAttributes>;
  inventories: ModelDefined<InventoryAttributes, InventoryCreationAttributes>;
  inventory_products: ModelDefined<InventoryProductAttributes, InventoryProductCreationAttributes>;
  product_category: ModelDefined<ProductCategoryAttributes, ProductCategoryCreationAttributes>;
  product_resources: ModelDefined<ProductResourceAttributes, ProductResourceCreationAttributes>;
}
