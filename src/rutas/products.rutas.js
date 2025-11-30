import {Router} from 'express'
import { ProductsController } from '../controladores/products.controladores.js';
import { validateFields } from '../middlewares/validate-fields.middleware.js';
import { ProductValidator } from '../validators/products.validator.js';
const router= Router();
const products_controller= new ProductsController()
const product_validator = new ProductValidator();

//obtener una lista
router.get('/', products_controller.getAll)
//obtener uno
router.get(
    '/:id',
    ...product_validator.validateProductId,
    validateFields,
    products_controller.getOne
)   
//post
router.post(
    '/',
    ...product_validator.validateProduct,
    validateFields,
    product_validator.validateIfNameIsUse,
    products_controller.created
)
//put
router.put(
    '/:id',
    ...product_validator.validateProductId,
    ...product_validator.validateProduct,
    validateFields,
    product_validator.validateIfNameIsUse,
    products_controller.updated
)
//delete
router.delete(
    '/:id',
    ...product_validator.validateProductId,
    validateFields,
    products_controller.deleted
)
export default router;