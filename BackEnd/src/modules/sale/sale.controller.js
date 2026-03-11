import {Router} from "express"
import * as saleService from "./sale.service.js"
import { asyncHandler } from "../../utils/asyncHandler.js";
import { auth } from "../../middleware/auth.js";
const router = Router();

router.get("/sales",auth,asyncHandler(saleService.getAll));
router.get("/sales/:id",auth,asyncHandler(saleService.getSaleById));
router.post("/sales", auth,asyncHandler(saleService.addSale));
router.put("/sales/:id",auth,asyncHandler(saleService.updateSale));
router.delete("/sales/:id",auth,asyncHandler(saleService.deleteSale));


export default router