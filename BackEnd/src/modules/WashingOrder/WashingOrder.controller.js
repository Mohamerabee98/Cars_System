import express from "express";
import { asyncHandler } from './../../utils/asyncHandler.js';
import { auth } from './../../middleware/auth.js';
import {
  createOrder,
  getAllOrders,
} from "./WashingOrder.services.js";

const router = express.Router();

router.post("/create",auth, asyncHandler(createOrder));
router.get("/",auth, asyncHandler(getAllOrders));

export default router;