import { DataTypes } from "sequelize";
import { sequelize } from "../connect.js";

const Customer = sequelize.define("Customer", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: DataTypes.STRING(50),
  phone: {
  type: DataTypes.STRING,
  allowNull: false,
},
  email: {
  type: DataTypes.STRING,
  allowNull: false,
  unique: true
},
  national_id: DataTypes.STRING(20),
  password: DataTypes.STRING,
  role:DataTypes.STRING
});
export default Customer;
