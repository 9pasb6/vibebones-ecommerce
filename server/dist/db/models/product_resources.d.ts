import { Optional } from "sequelize";
declare const Model: any;
interface ProductResourceAttributes {
    id: number;
    product_id: number;
    file_name: string;
    url: string;
    width: number;
    height: number;
    size: number;
    resource_type: string;
    public_id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
}
interface ProductResourceCreationAttributes extends Optional<ProductResourceAttributes, 'id' | 'deletedAt'> {
}
declare class ProductResource extends Model<ProductResourceAttributes, ProductResourceCreationAttributes> implements ProductResourceAttributes {
    id: number;
    product_id: number;
    file_name: string;
    url: string;
    width: number;
    height: number;
    size: number;
    resource_type: string;
    public_id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
}
export default ProductResource;
export type { ProductResourceAttributes, ProductResourceCreationAttributes };
