"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsByUser = exports.getProductsByInventory = exports.getAllProducts = exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = void 0;
const index_1 = __importDefault(require("../db/models/index"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const appError_1 = __importDefault(require("../utils/appError"));
// ----------------------------------------------
/**
 * Recupera un producto por su ID.
 */
const getProductById = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    const product = yield index_1.default.products.findByPk(productId, {
        include: [
            {
                model: index_1.default.categories
            },
            // {
            //   model: db.inventories,
            //   attributes: ['quantity', 'location'],
            // },
        ],
    });
    if (!product) {
        throw new appError_1.default('Producto no encontrado', 404);
    }
    res.status(200).json({
        message: 'Producto recuperado con éxito',
        product,
    });
}));
exports.getProductById = getProductById;
// ----------------------------------------------
/**
 * Crea un nuevo producto.
 */
const createProduct = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, price, stock, tax, category_id } = req.body;
    if (!title || !price || !category_id) {
        throw new appError_1.default('El título, precio, ID de categoría, fecha y estado son obligatorios', 400);
    }
    try {
        const product = yield index_1.default.products.create({
            title,
            description,
            price,
            stock,
            tax,
            category_id
        });
        if (!product) {
            throw new appError_1.default('Error al crear el producto', 400);
        }
        res.status(201).json({
            message: 'Producto creado con éxito',
            product,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error al crear el producto",
        });
    }
}));
exports.createProduct = createProduct;
// ----------------------------------------------
/**
 * Actualiza un producto existente.
 */
const updateProduct = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    const product = yield index_1.default.products.findByPk(productId);
    if (!product) {
        throw new appError_1.default('Producto no encontrado', 404);
    }
    const { title, description, price, stock, tax, category_id, date, status } = req.body;
    const updatedProduct = yield product.update({
        title,
        description,
        price,
        stock,
        tax,
        category_id,
        date,
        status,
    });
    if (!updatedProduct) {
        throw new appError_1.default('Error al actualizar el producto', 400);
    }
    res.status(200).json({
        message: 'Producto actualizado con éxito',
        product: updatedProduct,
    });
}));
exports.updateProduct = updateProduct;
// ----------------------------------------------
/**
 * Elimina un producto existente.
 */
const deleteProduct = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield index_1.default.products.findByPk(id);
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }
        yield product.destroy();
        return res.status(200).json({
            status: "success",
            message: "Producto eliminado exitosamente",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error al eliminar el producto",
        });
    }
}));
exports.deleteProduct = deleteProduct;
// ----------------------------------------------
/**
 * Recupera todos los productos.
 */
const getAllProducts = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield index_1.default.products.findAll();
    if (!products.length) {
        return res.status(200).json({
            status: 'success',
            message: 'No se encontraron productos',
            products: [],
        });
    }
    res.status(200).json({
        status: 'success',
        message: 'Productos recuperados con éxito',
        products,
    });
}));
exports.getAllProducts = getAllProducts;
// ----------------------------------------------
/**
 * Recupera todos los productos de un inventario.
 */
const getProductsByInventory = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const inventoryId = req.params.id;
    const products = yield index_1.default.products.findAll({
        include: [
            {
                model: index_1.default.Inventory,
                where: { id: inventoryId },
            },
        ],
    });
    if (!products.length) {
        return res.status(200).json({
            message: 'No se encontraron productos en el inventario',
            products: [],
        });
    }
    res.status(200).json({
        message: 'Productos recuperados con éxito',
        products,
    });
}));
exports.getProductsByInventory = getProductsByInventory;
// ----------------------------------------------
/**
 * Recupera todos los productos asociados a un usuario.
 */
const getProductsByUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const products = yield index_1.default.products.findAll({
        where: { userId },
    });
    if (!products.length) {
        return res.status(200).json({
            message: 'No se encontraron productos para el usuario',
            products: [],
        });
    }
    res.status(200).json({
        message: 'Productos recuperados con éxito',
        products,
    });
}));
exports.getProductsByUser = getProductsByUser;
//# sourceMappingURL=productController.js.map