import { DataTypes } from "sequelize";
import {sequelize} from "../connect.js";

const WashingOrder = sequelize.define("WashingOrder", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  plate_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  car_type: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "pending",
  },
  entry_time: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

export default WashingOrder;