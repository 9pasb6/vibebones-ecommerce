"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// authController
const { signup, login, authentication, recoverPassword, isAuthenticated, } = require("../controller/authController");
// viewController
const productController_1 = require("../controller/productController");
const router = (0, express_1.Router)();
// login endpoints
router.get('/login', isAuthenticated, (req, res) => {
    res.render('login', { title: 'Login' });
});
router.post('/login', login);
// product endpoints
router.get('/', authentication, (req, res) => {
    res.render('index', {
        title: 'Inicio',
        user: req.user // Pasando la información del usuario a la plantilla
    });
});
router.get('/products/update/:id', authentication, (req, res) => {
    res.render('updateProduct', { title: 'updateProduct', user: req.user });
});
router.get('/products/create/', authentication, (req, res) => {
    res.render('createProduct', { title: 'createProduct', user: req.user });
});
router.route('/products').get(authentication, productController_1.getAllProducts);
router.route('/products/:id').delete(authentication, productController_1.deleteProduct);
router.route('/products/:id').patch(authentication, productController_1.updateProduct);
module.exports = router;
//# sourceMappingURL=viewRoute.js.map