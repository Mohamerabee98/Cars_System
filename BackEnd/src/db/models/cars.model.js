// models/Car.js
import { DataTypes } from "sequelize";
import { sequelize } from "../connect.js";


const Car = sequelize.define("Car", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  company: DataTypes.STRING(50),
  color: DataTypes.STRING(50),
  price: DataTypes.FLOAT,
  status: DataTypes.STRING,
  stok:DataTypes.INTEGER,
  image:DataTypes.JSON
});


export default Car;