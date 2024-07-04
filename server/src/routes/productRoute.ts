import { Router } from 'express';
import {
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductsByInventory,
  getProductsByUser,
} from '../controller/productController';
import { authentication } from '../controller/authController';

const router = Router();

/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *               tax:
 *                 type: number
 *               category_id:
 *                 type: number
 *               date:
 *                 type: string
 *               status:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Producto creado con éxito
 *                 product:
 *                   $ref: '#/components/schemas/ProductResponseSchema'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.route('/').post(authentication, createProduct);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Product]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Producto recuperado con éxito
 *                 product:
 *                   $ref: '#/components/schemas/ProductResponseSchema'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.route('/:id').get(authentication, getProductById);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   patch:
 *     summary: Update a product by ID
 *     tags: [Product]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductUpdateRequestSchema'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Producto actualizado con éxito
 *                 product:
 *                   $ref: '#/components/schemas/ProductResponseSchema'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.route('/:id').patch(authentication, updateProduct);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Product]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.route('/:id').delete(authentication, deleteProduct);

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Productos recuperados con éxito
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ProductResponseSchema'
 *       500:
 *         description: Internal server error
 */
router.route('/').get(authentication, getAllProducts);

/**
 * @swagger
 * /api/v1/products/inventory/{id}:
 *   get:
 *     summary: Get all products by inventory ID
 *     tags: [Product]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the inventory to retrieve products from
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Productos recuperados con éxito
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ProductResponseSchema'
 *       404:
 *         description: Products not found in the inventory
 *       500:
 *         description: Internal server error
 */
router.route('/inventory/:id').get(authentication, getProductsByInventory);

/**
 * @swagger
 * /api/v1/products/user/{id}:
 *   get:
 *     summary: Get all products by user ID
 *     tags: [Product]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve products from
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Productos recuperados con éxito
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ProductResponseSchema'
 *       404:
 *         description: Products not found for the user
 *       500:
 *         description: Internal server error
 */
router.route('/user/:id').get(authentication, getProductsByUser);

module.exports = router;