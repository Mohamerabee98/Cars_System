import { DataTypes } from "sequelize";
import {sequelize} from "../connect.js";

const Washing = sequelize.define("Washing", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  type: {
    type: DataTypes.STRING(20),
  },

  cost: {
    type: DataTypes.FLOAT,
  },

  washing_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  washing_order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Washing;