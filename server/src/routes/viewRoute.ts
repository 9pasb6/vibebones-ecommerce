import { Router, Request, Response, NextFunction } from 'express';
// authController
const {
    signup,
    login,
    authentication,
    recoverPassword,
    isAuthenticated,
  } = require("../controller/authController");

  // viewController
  import {
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getProductsByInventory,
    getProductsByUser,
  } from '../controller/productController';


  const router = Router();

  // login endpoints

  
  router.get('/login', isAuthenticated, (req: Request, res: Response) => {
    res.render('login', { title: 'Login' });
  });
  
  router.post('/login', login);


  // product endpoints

  
  router.get('/', authentication, (req: Request, res: Response) => {
    res.render('index', {
      title: 'Inicio',
      user: req.user // Pasando la información del usuario a la plantilla
    });
  });

  router.get('/products/update/:id', authentication, (req: Request, res: Response) => {
    res.render('updateProduct', { title: 'updateProduct', user: req.user });
  });
  

  router.route('/products').get(authentication, getAllProducts);

  router.route('/products/:id').delete(authentication, deleteProduct);

  router.route('/products/:id').patch(authentication, updateProduct);


module.exports = router;