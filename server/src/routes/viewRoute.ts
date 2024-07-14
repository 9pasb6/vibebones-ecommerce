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

  router.get('/register', isAuthenticated,(req: Request, res: Response) => {
    res.render('register', { title: 'Register' });
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
  

  router.get('/products/create/', authentication, (req: Request, res: Response) => {
    res.render('createProduct', { title: 'createProduct', user: req.user });
  });

  router.route('/products').get(authentication, getAllProducts);

  router.route('/products/:id').delete(authentication, deleteProduct);

  router.route('/products/:id').patch(authentication, updateProduct);


  // purchase endpoints

  // purchase for admin
  router.get('/purchase', authentication, (req: Request, res: Response) => {
    res.render('purchase', { title: 'purchase', user: req.user });
  });

  // generate purchase
  router.get('/purchase/create/:id', authentication, (req: Request, res: Response) => {
    res.render('purchaseCreate', { title: 'purchaseCreate', user: req.user });
  });

  //  purchase for user
  router.get('/purchase/user/', authentication, (req: Request, res: Response) => {
    res.render('purchaseUser', { title: 'purchaseUser', user: req.user });
  });

 // cart purchase
 router.get('/cart', authentication, (req: Request, res: Response) => {
  res.render('cart', { title: 'cart', user: req.user });
});


  

module.exports = router;