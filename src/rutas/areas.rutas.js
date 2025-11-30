import { Router } from "express";
import { AreasController } from "../controladores/areas.controladores.js";
import { validateFields } from "../middlewares/validate-fields.middleware.js";
import { AreasValidator } from "../validators/areas.validator.js";

const router = Router();
const areas_controller = new AreasController();
const areas_validator = new AreasValidator();

//obtener una lista
router.get("/", areas_controller.getAll);

//obtener uno
router.get(
  "/:id",
  ...areas_validator.validateAreaId,
  validateFields,
  areas_controller.getOne
);

//post
router.post(
  "/",
  ...areas_validator.validateArea,
  validateFields,
  areas_validator.validateIfNameIsUse,
  areas_controller.created
);

//put
router.put(
  "/:id",
  ...areas_validator.validateAreaId,
  ...areas_validator.validateArea,
  validateFields,
  areas_validator.validateIfNameIsUse,
  areas_controller.updated
);

//delete
router.delete(
  "/:id",
  ...areas_validator.validateAreaId,
  validateFields,
  areas_controller.deleted
);
export default router;