import { authentication, restrictTo } from "../controller/authController";
const { 
    generatePurchase,
    getAllPurchases, 
    getPurchasesByUserId,

 } = require("../controller/purchaseController"); // Asegúrate de ajustar la ruta según tu estructura

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
router.route("/").post(authentication, restrictTo("ADMIN", "USER", "LOCATION"), generatePurchase); 

router.route("/").get(authentication, restrictTo("ADMIN", "USER", "LOCATION"), getAllPurchases); 

router.route("/:id").get(authentication, restrictTo("ADMIN", "USER", "LOCATION"), getPurchasesByUserId); 



module.exports = router;
