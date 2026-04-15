import {Router} from "express"
import * as authServices from "./auth.service.js"
const router = Router()

// localhost:3000/auth/register
// /auth/login
router.post("/register" ,authServices.register )
router.post("/login" , authServices.Login)
export default router 