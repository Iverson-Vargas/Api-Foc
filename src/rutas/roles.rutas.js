
import { Router } from 'express';
import { RoleController } from '../controladores/roles.controladores.js';
import { validateFields } from '../middlewares/validate-fields.middleware.js';
import { RoleValidator } from '../validators/roles.validator.js';

const router = Router();
const role_controller= new RoleController()
const role_validator = new RoleValidator();

//obtener una lista
router.get('/', role_controller.getAll)
//obtener uno
router.get(
    '/:id',
    ...role_validator.validateRoleId,
    validateFields,
    role_controller.getOne
)
//post
router.post(
    '/',
    ...role_validator.validateRole,
    validateFields,
    role_validator.validateIfNameIsUse,
    role_controller.created
)
//put
router.put(
    '/:id',
    ...role_validator.validateRoleId,
    ...role_validator.validateRole,
    validateFields,
    role_validator.validateIfNameIsUse,
    role_controller.updated
)
//delete
router.delete(
    '/:id',
    ...role_validator.validateRoleId,
    validateFields,
    role_controller.deleted
)
export default router;