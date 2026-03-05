import {Router} from "express"
import * as carService from "./car.service.js"
const router = Router();

router.get("/cars",carService.getCars)
router.get("/cars/:id",carService.getCarById)
router.post("/cars",carService.addCar)
router.put("/cars/:id",carService.updateCar)
router.delete("/cars/:id",carService.deleteCar)



export default router