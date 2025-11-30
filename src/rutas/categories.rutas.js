import { Router } from 'express';
import { CategoryController } from '../controladores/categories.controladores.js';
import { validateFields } from '../middlewares/validate-fields.middleware.js';
import { CategoryValidator } from '../validators/categories.validator.js';

const router = Router();
const category_controller= new CategoryController()
const category_validator = new CategoryValidator();

//obtener una lista
router.get('/', category_controller.getAll)
//obtener uno
router.get(
    '/:id',
    ...category_validator.validateCategoryId,
    validateFields,
    category_controller.getOne
)
//post
router.post(
    '/',
    ...category_validator.validateCategory,
    validateFields,
    category_validator.validateIfNameIsUse,
    category_controller.created
)
//put
router.put(
    '/:id',
    ...category_validator.validateCategoryId,
    ...category_validator.validateCategory,
    validateFields,
    category_validator.validateIfNameIsUse,
    category_controller.updated
)
//delete
router.delete(
    '/:id',
    ...category_validator.validateCategoryId,
    validateFields,
    category_controller.deleted
)
export default router;