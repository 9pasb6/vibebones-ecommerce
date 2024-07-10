import { Optional } from "sequelize";
declare const Model: any;
interface PurchaseAttributes {
    id: string;
    user_id: number;
    cart_id: number;
    date: Date;
    total: number;
}
interface PurchaseCreationAttributes extends Optional<PurchaseAttributes, 'id'> {
}
declare class Purchase extends Model<PurchaseAttributes, PurchaseCreationAttributes> implements PurchaseAttributes {
    id: string;
    user_id: number;
    cart_id: number;
    date: Date;
    total: number;
}
export default Purchase;
export type { PurchaseAttributes, PurchaseCreationAttributes };
