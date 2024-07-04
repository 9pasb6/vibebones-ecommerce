import { Optional } from "sequelize";
declare const Model: any;
interface PurchaseAttributes {
    id: number;
    user_id: number;
    cart_id: number;
    quantity: number;
    price_quantity: number;
    total_quantity: number;
    total: number;
    date: string;
}
interface PurchaseCreationAttributes extends Optional<PurchaseAttributes, 'id'> {
}
declare class Purchase extends Model<PurchaseAttributes, PurchaseCreationAttributes> implements PurchaseAttributes {
    id: number;
    user_id: number;
    cart_id: number;
    quantity: number;
    price_quantity: number;
    total_quantity: number;
    total: number;
    date: string;
}
export default Purchase;
export type { PurchaseAttributes, PurchaseCreationAttributes };
