import { Router } from 'express';
import { UserController } from '../controladores/users.controladores.js';
import { validateFields } from '../middlewares/validate-fields.middleware.js';
import { UserValidator } from '../validators/users.validator.js';

const router = Router();
const user_controller = new UserController();
const user_validator = new UserValidator();

router.get('/', user_controller.getAll);

router.get(
    '/:id',
    ...user_validator.validateUserId,
    validateFields,
    user_controller.getOne
);

router.post(
    '/',
    ...user_validator.validateUser,
    validateFields,
    user_validator.validateIfEmailIsUse,
    user_validator.validateIfUsernameIsUse,
    user_controller.created
);

router.put(
    '/:id',
    ...user_validator.validateUserId,
    ...user_validator.validateUser,
    validateFields,
    user_validator.validateIfEmailIsUse,
    user_validator.validateIfUsernameIsUse,
    user_controller.updated
);

router.delete(
    '/:id',
    ...user_validator.validateUserId,
    validateFields,
    user_controller.deleted
);

export default router;
