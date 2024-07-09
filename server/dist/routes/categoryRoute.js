"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const { authentication, restrictTo } = require("../controller/authController");
const { getCategoryById, getAllCategories, createCategory, updateCategory, deleteCategory, } = require("../controller/categoryController");
const router = express.Router();
/**
 * @swagger
 * /api/v1/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
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
 *                   example: Categorias recuperadas exitosamente
 *                 categories:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CategoryResponseSchema'
 *       401:
 *         description: Unauthorized
 */
router.route("/").get(authentication, getAllCategories);
/**
 * @swagger
 * /api/v1/categories/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Category]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the category to retrieve
 *     responses:
 *       200:
 *         description: Category retrieved successfully
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
 *                   example: Categoría recuperada exitosamente
 *                 data:
 *                   $ref: '#/components/schemas/CategoryResponseSchema'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Category not found
 */
router.route("/:id").get(authentication, restrictTo("ADMIN"), getCategoryById);
/**
 * @swagger
 * /api/v1/categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Category created successfully
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
 *                   example: Categoría creada exitosamente
 *                 category:
 *                   $ref: '#/components/schemas/CategoryResponseSchema'
 *       400:
 *         description: Bad request
 */
router.route("/").post(authentication, restrictTo("ADMIN"), createCategory);
/**
 * @swagger
 * /api/v1/categories/{id}:
 *   patch:
 *     summary: Update an existing category
 *     tags: [Category]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the category to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       200:
 *         description: Category updated successfully
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
 *                   example: Categoría actualizada exitosamente
 *                 category:
 *                   $ref: '#/components/schemas/CategoryResponseSchema'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Category not found
 */
router.route("/:id").patch(authentication, restrictTo("ADMIN"), updateCategory);
/**
 * @swagger
 * /api/v1/categories/{id}:
 *   delete:
 *     summary: Delete an existing category
 *     tags: [Category]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the category to delete
 *     responses:
 *       204:
 *         description: Category deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Category not found
 */
router
    .route("/:id")
    .delete(authentication, restrictTo("ADMIN"), deleteCategory);
module.exports = router;
//# sourceMappingURL=categoryRoute.js.map