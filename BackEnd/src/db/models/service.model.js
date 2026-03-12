import { DataTypes } from "sequelize";
import {sequelize} from "../connect.js";

const Service = sequelize.define("Service", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT,
  },

  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  duration: {
    type: DataTypes.INTEGER,
  },

  category: {
    type: DataTypes.STRING,
  },

  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  
}, {
  tableName: "Service", 
  timestamps: true,      
});

export default Service;