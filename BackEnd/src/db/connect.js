import { Sequelize } from 'sequelize';
export const sequelize = new Sequelize("cars_system" , "root" ,"" ,{
    host:"127.0.0.1" , 
    dialect: "mysql",
})


export const connectionDB = async ()=>{
   try {
    await sequelize.authenticate()
    console.log("db connection successfully");
    
   } catch (error) {
    console.log("fail to connected " , error.message);
   }
}

export const syncModels = async()=>{
   await sequelize.sync()
}