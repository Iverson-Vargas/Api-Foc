import { RoleServices } from '../servicios/roles.servicios.js';
import { body, param } from 'express-validator';

class RoleValidator {

  validateRole = [
    body('name').notEmpty().withMessage('El nombre es requerido'),
    body('name').isString().withMessage('El nombre debe ser una cadena de texto'),
  ];

  validateRoleId = [
    param('id').notEmpty().withMessage('El id es requerido'),
    param('id').isInt().withMessage('El id debe ser un número'),
    param('id').custom(async (id) => {
      if (isNaN(Number(id))) {
        throw new Error(`El parámetro id: ${id} debe ser un número`);
      }
      const { status } = await RoleServices.getById(Number(id));
      if (status === 404) {
        throw new Error('El id del rol no se encuentra en los registros');
      }
      return true;
    }),
  ];

  validateIfNameIsUse = async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return next();
    }

    const { status, data } = await RoleServices.getByName(name);

    if (status === 200) {
      const role = data.role;

      if (!id) {
        return res.status(400).json({
          errors: [
            {
              type: 'field',
              msg: `El nombre de rol '${name}' ya está en uso.`,
              path: 'name',
              location: 'body',
            },
          ],
        });
      }
      else {
        if (id != role.id) {
          return res.status(400).json({
            errors: [
              {
                type: 'field',
                msg: `El nombre de rol '${name}' ya está en uso por otro registro.`,
                path: 'name',
                location: 'body',
              },
            ],
          });
        }
      }
    }
    next();
  };
}

export { RoleValidator };