import { Optional } from "sequelize";
declare const Model: any;
interface CartAttributes {
    id: number;
    user_id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
}
interface CartCreationAttributes extends Optional<CartAttributes, 'id'> {
}
declare class Cart extends Model<CartAttributes, CartCreationAttributes> implements CartAttributes {
    id: number;
    user_id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
}
export default Cart;
export type { CartAttributes, CartCreationAttributes };
