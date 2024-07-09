export {}; // NO DELETED, importante para la importación y exportación del routing

const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  refresh,
  profile,
  authentication,
  recoverPassword,
} = require("../controller/authController");

/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreationSchema'
 *     responses:
 *       200:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponseSchema'
 *       400:
 *         description: Bad request
 */
router.route("/signup").post(signup);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLoginSchema'
 *     responses:
 *       200:
 *         description: User successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserLoginResponseSchema'
 *       400:
 *         description: Bad request
 */
router.route("/login").post(login);

/**
 * @swagger
 * /api/v1/auth/refresh:
 *   post:
 *     summary: Refresh user access token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Access token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AccessTokenResponseSchema'
 *       401:
 *         description: Unauthorized
 */
router.route("/refresh").post(refresh);

/**
 * @swagger
 * /api/v1/auth/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfileResponseSchema'
 *       401:
 *         description: Unauthorized
 */
router.get("/profile", authentication, profile);



/**
 * @swagger
 * /api/v1/auth/recover-password:
 *   post:
 *     summary: Recover password
 *     tags: [Auth]
 *     description: Send a password recovery email to the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Password recovery email sent
 *       404:
 *         description: User not found
 */
router.route('/recover-password').post(recoverPassword);


module.exports = router;
