import {Router} from "express"
import * as carService from "./car.service.js"
import { asyncHandler } from "../../utils/asyncHandler.js";
import { auth } from "../../middleware/auth.js";
const router = Router();


router.get("/cars",asyncHandler(carService.getCars))
router.get("/cars/:id",asyncHandler(carService.getCarById))
router.post("/cars",auth,asyncHandler(carService.addCar))
router.put("/cars/:id",auth,asyncHandler(carService.updateCar))
router.delete("/cars/:id",auth,asyncHandler(carService.deleteCar))



export default router