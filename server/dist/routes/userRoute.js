"use strict";
const { authentication, restrictTo } = require("../controller/authController");
const { getAllUser, assignMallsToUser, } = require("../controller/userController");
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
router.route("/").get(authentication, restrictTo("ADMIN"), getAllUser); // only admin can access
/**
 * @swagger
 * /api/v1/users/{userId}/malls:
 *   post:
 *     summary: Assign malls to user
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
 *         description: ID of the user to assign malls to
 *       - in: body
 *         name: malls
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             malls:
 *               type: array
 *               items:
 *                 type: integer
 *         description: Array of mall IDs to assign to the user
 *     responses:
 *       200:
 *         description: Malls assigned to user successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Malls assigned to user successfully"
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found or one or more malls not found
 */
router.route("/:userId/malls").post(authentication, assignMallsToUser); // both admin and commerce can access
module.exports = router;
//# sourceMappingURL=userRoute.js.map