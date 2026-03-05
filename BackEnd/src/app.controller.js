import * as connect from "./db/connect.js";
import "./db/models/associations.js";
import authRouter from "./modules/auth/auth.controller.js"
import carRouter from "./modules/car/car.controller.js"
const bootstrap = async (app, express) => {
  app.use(express.json()); // Json

  await connect.connectionDB();
  await connect.syncModels();

  app.use("/auth" , authRouter)
  app.use("/api",carRouter)
  
  
};
export default bootstrap;
