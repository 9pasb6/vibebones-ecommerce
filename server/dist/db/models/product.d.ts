import { Optional } from "sequelize";
declare const Model: any;
interface ProductAttributes {
    id: number;
    title: string;
    description: string;
    price: number;
    stock: number;
    tax: number;
    category_id: number;
    date: string;
    status: boolean;
}
interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> {
}
declare class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
    id: number;
    title: string;
    description: string;
    price: number;
    stock: number;
    tax: number;
    category_id: number;
    date: string;
    status: boolean;
}
export default Product;
export type { ProductAttributes, ProductCreationAttributes };
