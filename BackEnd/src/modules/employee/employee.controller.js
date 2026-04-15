import {Router} from "express"
import * as employeeServices from "./employee.service.js"
import { asyncHandler } from "../../utils/asyncHandler.js"
const router = Router();

// localhost:3000/auth/emplyee/register
// /auth/emplyee/login
router.post("/employee/register" ,asyncHandler(employeeServices.register) )
router.post("/employee/login" , asyncHandler(employeeServices.Login))
export default router 