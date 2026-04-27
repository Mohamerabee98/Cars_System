import {Router} from "express"
import * as userServices from "./user.service.js"
import { auth } from "../../middleware/auth.js"
import { asyncHandler } from "../../utils/asyncHandler.js"
const router = Router()

router.get("/users",auth,asyncHandler(userServices.getUsers))
router.get("/get",auth,asyncHandler(userServices.getUserProfile))
// localhost:3000/profile/update
router.put("/update" ,auth,asyncHandler(userServices.updateProfile) )
router.delete("/delete" ,auth,asyncHandler(userServices.deleteAccount) )

export default router 