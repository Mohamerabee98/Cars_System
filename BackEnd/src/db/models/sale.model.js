// models/Sale.js
import { DataTypes } from "sequelize";
import { sequelize } from "../connect.js";

const Sale = sequelize.define("Sale", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  sale_date: DataTypes.DATE,
  total_price: DataTypes.FLOAT,

  customer_id: DataTypes.INTEGER,
  car_id: DataTypes.INTEGER,
  employee_id: DataTypes.INTEGER,
});

export default Sale;  