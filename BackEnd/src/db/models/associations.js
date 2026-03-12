import Customer from "./Customer.model.js";
import Employee from "./employee.model.js";
import Car from "./cars.model.js";
import Sale from "./sale.model.js";
import Purchase from "./purchase.model.js";
import Payment from "./payment.model.js";
import Washing from "./Washing.model.js";
import Washing_Material from "./Washing_Material.model.js";
import WashingMaterial from "./WashingMaterial.model.js";
import Service from './service.model.js';

// ================= Sales =================
Customer.hasMany(Sale, {
  foreignKey: "customer_id",
});
Sale.belongsTo(Customer, { foreignKey: "customer_id" });

Car.hasMany(Sale, {
  foreignKey: "car_id",
});
Sale.belongsTo(Car, { foreignKey: "car_id" });

Employee.hasMany(Sale, {
  foreignKey: "employee_id",
});
Sale.belongsTo(Employee, { foreignKey: "employee_id" });

// ================= Purchases =================
Customer.hasMany(Purchase, {
  foreignKey: "customer_id",
});
Purchase.belongsTo(Customer, { foreignKey: "customer_id" });

Car.hasMany(Purchase, {
  foreignKey: "car_id",
});
Purchase.belongsTo(Car, { foreignKey: "car_id" });

Employee.hasMany(Purchase, {
  foreignKey: "employee_id",
});
Purchase.belongsTo(Employee, { foreignKey: "employee_id" });

// ================= Payments =================
Customer.hasMany(Payment, {
  foreignKey: "customer_id",
});
Payment.belongsTo(Customer, { foreignKey: "customer_id" });

Sale.hasMany(Payment, {
  foreignKey: "sale_id",
});
Payment.belongsTo(Sale, { foreignKey: "sale_id" });

Purchase.hasMany(Payment, {
  foreignKey: "purchase_id",
});
Payment.belongsTo(Purchase, { foreignKey: "purchase_id" });
// =================   Service =================
Service.hasMany(Washing, { foreignKey: "service_id" });
Washing.belongsTo(Service, { foreignKey: "service_id" });

// ================= Washing =================
Customer.hasMany(Washing, {
  foreignKey: "customer_id",
});
Washing.belongsTo(Customer, { foreignKey: "customer_id" });

Car.hasMany(Washing, {
  foreignKey: "car_id",
});
Washing.belongsTo(Car, { foreignKey: "car_id" });

Employee.hasMany(Washing, {
  foreignKey: "employee_id",
});
Washing.belongsTo(Employee, { foreignKey: "employee_id" });

// ================= WashingMaterial (M:N) =================
Washing.belongsToMany(WashingMaterial, {
  through: Washing_Material,
  foreignKey: "washing_id",
  otherKey: "material_id",
});

WashingMaterial.belongsToMany(Washing, {
  through: Washing_Material,
  foreignKey: "material_id",
  otherKey: "washing_id",
});
