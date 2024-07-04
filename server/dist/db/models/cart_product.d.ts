declare const Model: any;
interface CartProductAttributes {
    product_id: number;
    cart_id: number;
    quantity: number;
    price_quantity: number;
}
interface CartProductCreationAttributes extends CartProductAttributes {
}
declare class CartProduct extends Model<CartProductAttributes, CartProductCreationAttributes> implements CartProductAttributes {
    product_id: number;
    cart_id: number;
    quantity: number;
    price_quantity: number;
}
export default CartProduct;
export type { CartProductAttributes, CartProductCreationAttributes };
