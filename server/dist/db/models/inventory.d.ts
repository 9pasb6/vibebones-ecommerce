import { Optional } from "sequelize";
declare const Model: any;
interface InventoryAttributes {
    id: number;
    date: string;
    user_id: number;
}
interface InventoryCreationAttributes extends Optional<InventoryAttributes, 'id'> {
}
declare class Inventory extends Model<InventoryAttributes, InventoryCreationAttributes> implements InventoryAttributes {
    id: number;
    date: string;
    user_id: number;
}
export default Inventory;
export type { InventoryAttributes, InventoryCreationAttributes };
