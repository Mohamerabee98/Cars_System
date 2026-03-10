import {Router} from "express"
import * as carService from "./car.service.js"
import { asyncHandler } from "../../utils/asyncHandler.js";
const router = Router();

router.get("/cars",asyncHandler(carService.getCars))
router.get("/cars/:id",asyncHandler(carService.getCarById))
router.post("/cars",asyncHandler(carService.addCar))
router.put("/cars/:id",asyncHandler(carService.updateCar))
router.delete("/cars/:id",asyncHandler(carService.deleteCar))



export default router