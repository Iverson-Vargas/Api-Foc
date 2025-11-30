import { body, param } from 'express-validator';
import { UserServices } from '../servicios/users.servicios.js';
import { RoleServices } from '../servicios/roles.servicios.js';

class UserValidator {

  validateUser = [
    body('name').notEmpty().withMessage('El nombre es requerido'),
    body('name').isString().withMessage('El nombre debe ser una cadena de texto'),

    body('username').notEmpty().withMessage('El nombre de usuario es requerido'),
    body('username').isString().withMessage('El nombre de usuario debe ser una cadena de texto'),

    body('email').notEmpty().withMessage('El email es requerido'),
    body('email').isEmail().withMessage('El formato del email no es válido'),

    body('password').notEmpty().withMessage('La contraseña es requerida'),
    body('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),

    body('role_id').notEmpty().withMessage('El ID del rol es requerido'),
    body('role_id').isInt().withMessage('El ID del rol debe ser un número entero'),
    body('role_id').custom(async (id) => {
      if (isNaN(Number(id))) {
        throw new Error(`El parámetro role_id: ${id} debe ser un número`);
      }
      const { status } = await RoleServices.getById(Number(id));
      if (status === 404) {
        throw new Error('El ID del rol no se encuentra en los registros');
      }
      return true;
    }),
  ];

  validateUserId = [
    param('id').notEmpty().withMessage('El id es requerido'),
    param('id').isInt().withMessage('El id debe ser un número'),
    param('id').custom(async (id) => {
      if (isNaN(Number(id))) {
        throw new Error(`El parámetro id: ${id} debe ser un número`);
      }
      const { status } = await UserServices.getById(Number(id));
      if (status === 404) {
        throw new Error('El id de usuario no se encuentra en los registros');
      }
      return true;
    }),
  ];

  validateIfEmailIsUse = async (req, res, next) => {
    const { id } = req.params;
    const { email } = req.body;

    if (!email) {
      return next();
    }

    const { status, data } = await UserServices.getByEmail(email);

    if (status === 200) {
      const user = data.user;

      if (!id) { // POST
        return res.status(400).json({
          errors: [{
            type: 'field',
            msg: `El email '${email}' ya está en uso.`,
            path: 'email',
            location: 'body',
          }],
        });
      }
      else { // PUT
        if (id != user.id) {
          return res.status(400).json({
            errors: [{
              type: 'field',
              msg: `El email '${email}' ya está en uso por otro usuario.`,
              path: 'email',
              location: 'body',
            }],
          });
        }
      }
    }
    next();
  };

  validateIfUsernameIsUse = async (req, res, next) => {
    const { id } = req.params;
    const { username } = req.body;

    if (!username) {
      return next();
    }

    const { status, data } = await UserServices.getByUsername(username);

    if (status === 200) {
      const user = data.user;

      if (!id) { // POST
        return res.status(400).json({
          errors: [{
            type: 'field',
            msg: `El nombre de usuario '${username}' ya está en uso.`,
            path: 'username',
            location: 'body',
          }],
        });
      }
      else { // PUT
        if (id != user.id) {
          return res.status(400).json({
            errors: [{
              type: 'field',
              msg: `El nombre de usuario '${username}' ya está en uso por otro usuario.`,
              path: 'username',
              location: 'body',
            }],
          });
        }
      }
    }
    next();
  };
}

export { UserValidator };