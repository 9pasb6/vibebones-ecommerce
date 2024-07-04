declare const Model: any;
interface ProductCategoryAttributes {
    product_id: number;
    category_id: number;
}
interface ProductCategoryCreationAttributes extends ProductCategoryAttributes {
}
declare class ProductCategory extends Model<ProductCategoryAttributes, ProductCategoryCreationAttributes> implements ProductCategoryAttributes {
    product_id: number;
    category_id: number;
}
export default ProductCategory;
export type { ProductCategoryAttributes, ProductCategoryCreationAttributes };
