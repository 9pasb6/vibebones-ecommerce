"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authController_1 = require("../controller/authController");
const { getAllUsers, getUserById, updateUser, deleteUser } = require("../controller/userController");
const router = require("express").Router();
/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     description: Only admins can access this endpoint
 *     responses:
 *       200:
 *         description: Users retrieved successfully
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
 *                         $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 */
router.route("/").get(authController_1.authentication, (0, authController_1.restrictTo)("ADMIN"), getAllUsers); // only admin can access
/**
 * @swagger
 * /api/v1/users/{userId}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     description: Both admin and commerce can access
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user to retrieve
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.route("/:id").get(authController_1.authentication, (0, authController_1.restrictTo)("ADMIN", "USER", "LOCATION"), getUserById); // both admin and commerce can access
/**
 * @swagger
 * /api/v1/users/{userId}:
 *   patch:
 *     summary: Update a user by ID
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     description: Both admin and commerce can access
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdateSchema'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.route("/:id").patch(authController_1.authentication, (0, authController_1.restrictTo)("ADMIN", "USER", "LOCATION"), updateUser); // both admin and commerce can access
/**
 * @swagger
 * /api/v1/users/{userId}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     description: Only admins can access this endpoint
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user to delete
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.route("/:id").delete(authController_1.authentication, (0, authController_1.restrictTo)("ADMIN"), deleteUser); // only admin can access
module.exports = router;
//# sourceMappingURL=userRoute.js.map