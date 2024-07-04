declare const Model: any;
interface InventoryProductAttributes {
    product_id: number;
    inventory_id: number;
}
interface InventoryProductCreationAttributes extends InventoryProductAttributes {
}
declare class InventoryProduct extends Model<InventoryProductAttributes, InventoryProductCreationAttributes> implements InventoryProductAttributes {
    product_id: number;
    inventory_id: number;
    quantity: number;
    price_quantity: number;
}
export default InventoryProduct;
export type { InventoryProductAttributes, InventoryProductCreationAttributes };
