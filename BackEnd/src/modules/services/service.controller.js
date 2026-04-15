import { Router } from "express";
import { asyncHandler } from "./../../utils/asyncHandler.js";
import { auth } from "./../../middleware/auth.js";
import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} from "./service.service.js";

const router = Router();

router.post("/", auth, asyncHandler(createService));

router.get("/", auth, asyncHandler(getAllServices));

router.get("/:id", auth, asyncHandler(getServiceById));

router.put("/:id", auth, asyncHandler(updateService));

router.delete("/:id", auth, asyncHandler(deleteService));

export default router;
