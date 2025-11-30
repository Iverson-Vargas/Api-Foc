import { Router } from "express";
import { AreasController } from "../controladores/areas.controladores.js";

const router = Router();
const areas_controller = new AreasController();

//obtener una lista
router.get("/", areas_controller.getAll);
//obtener uno
router.get("/:id", areas_controller.getOne);
//post
router.post("/", areas_controller.created);
//put
router.put("/:id", areas_controller.updated);
//delete
router.delete("/:id", areas_controller.deleted);
export default router;