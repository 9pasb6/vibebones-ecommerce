import { authentication, restrictTo } from "../controller/authController";
const {
  getAllCarts,
  getCartById,
  createCart,
  updateCart,
  deleteCart,
} = require("../controller/cartController");

const router = require("express").Router();

/**
 * @swagger
 * /api/v1/carts:
 *   get:
 *     summary: Get all carts
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     description: Both admin and commerce can access this endpoint
 *     responses:
 *       200:
 *         description: Carts retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     count:
 *                       type: integer
 *                       example: 5
 *                     rows:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Cart'
 *       401:
 *         description: Unauthorized
 */
router.route("/").get(authentication, restrictTo("ADMIN", "USER", "LOCATION"), getAllCarts); // both admin and commerce can access

/**
 * @swagger
 * /api/v1/carts/{id}:
 *   get:
 *     summary: Get a cart by ID
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     description: Both admin and commerce can access this endpoint
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the cart to retrieve
 *     responses:
 *       200:
 *         description: Cart retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: '#/components/schemas/Cart'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Cart not found
 */
router.route("/:id").get(authentication, restrictTo("ADMIN", "USER", "LOCATION"), getCartById); // both admin and commerce can access

/**
 * @swagger
 * /api/v1/carts:
 *   post:
 *     summary: Create a new cart
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     description: Both admin and commerce can access this endpoint
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartCreationSchema'
 *     responses:
 *       201:
 *         description: Cart created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.route("/").post(authentication, restrictTo("ADMIN", "USER", "LOCATION"), createCart); // both admin and commerce can access

/**
 * @swagger
 * /api/v1/carts/{id}:
 *   patch:
 *     summary: Update a cart by ID
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     description: Both admin and commerce can access this endpoint
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the cart to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartUpdateSchema'
 *     responses:
 *       200:
 *         description: Cart updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Cart not found
 */
router.route("/:id").patch(authentication, restrictTo("ADMIN", "USER", "LOCATION"), updateCart); // both admin and commerce can access

/**
 * @swagger
 * /api/v1/carts/{id}:
 *   delete:
 *     summary: Delete a cart by ID
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     description: Only admins can access this endpoint
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the cart to delete
 *     responses:
 *       204:
 *         description: Cart deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Cart not found
 */
router.route("/:id").delete(authentication, restrictTo("ADMIN"), deleteCart); // only admin can access

module.exports = router;
