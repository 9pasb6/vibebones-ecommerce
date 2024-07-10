"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authController_1 = require("../controller/authController");
const { generatePurchase } = require("../controller/purchaseController"); // Asegúrate de ajustar la ruta según tu estructura
const router = require("express").Router();
/**
 * @swagger
 * /api/v1/purchases:
 *   post:
 *     summary: Create a new purchase
 *     tags: [Purchase]
 *     security:
 *       - BearerAuth: []
 *     description: Both admin and commerce can access this endpoint
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PurchaseCreationSchema'
 *     responses:
 *       201:
 *         description: Purchase created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: '#/components/schemas/Purchase'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.route("/").post(authController_1.authentication, (0, authController_1.restrictTo)("ADMIN", "USER", "LOCATION"), generatePurchase); // both admin and commerce can access
module.exports = router;
//# sourceMappingURL=purchaseRoute.js.map