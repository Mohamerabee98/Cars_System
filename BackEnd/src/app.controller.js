import * as connect from "./db/connect.js";
import "./db/models/associations.js";
import authRouter from "./modules/auth/auth.controller.js"
import carRouter from "./modules/car/car.controller.js"
import saleRouter from "./modules/sale/sale.controller.js";
import serviceRouter from "./modules/services/service.controller.js";
import { errorHandel } from "./utils/errorHandeler.js";
const bootstrap = async (app, express) => {
  app.use(express.json()); // Json

  await connect.connectionDB();
  await connect.syncModels();

  app.use("/auth" , authRouter)
  app.use("/api",carRouter)
  app.use("/api",saleRouter)
  app.use("/api",serviceRouter)
  


  app.use(errorHandel)
};
export default bootstrap;
