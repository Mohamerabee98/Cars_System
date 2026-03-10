import Car from "../../db/models/cars.model.js";
import Customer from "../../db/models/Customer.model.js";
import Employee from "../../db/models/employee.model.js";
import Sale from "../../db/models/sale.model.js";
import { resMsg } from "../../utils/globaleMessage.js";

// ================= Get All Sales =================
export const getAll = async (req, res) => {
    const sale = await Sale.findAll({
        attributes: {
            exclude: ["customer_id", "employee_id", "car_id"]
        },
        include: [
            {
                model: Customer,
                attributes: ['id', 'name']
            },
            {
                model: Car,
                attributes: ['id', 'company']
            },
            {
                model: Employee,
                attributes: ['id', 'name']
            }
        ]

    });
    return resMsg(res, 200, "Get All Sales Success", sale)
};

// ================= Get Sale By Id =================
export const getSaleById = async (req, res, next) => {
    const { id } = req.params
    const sale = await Sale.findByPk(id, {
        attributes: {
            exclude: ["customer_id", "employee_id", "car_id"]
        },
        include: [
            {
                model: Customer,
                attributes: ["id", "name"]
            },
            {
                model: Car,
                attributes: ["id", "company"]
            },
            {
                model: Employee,
                attributes: ["id", "name"]
            }
        ]
    });
    if (!sale)
        return next(new Error(`the sale with ${id} not found`, { cause: 404 }))
    return resMsg(res, 200, "Get All Sales Success", sale).status(200)
};

// ================= Add Sales =================
export const addSale = async (req, res, next) => {
    const { date, totalPrice, customerId, employeeId, carId } = req.body;
    const car = await Car.findByPk(carId);
    if (!car)
        return next(new Error(`Car not found`, { cause: 404 }))

    if (car.status === "sold")
        next(new Error(`This car is already sold`, { cause: 400 }));

    const sale = await Sale.create({
        sale_date: date,
        total_price: totalPrice,
        customer_id: customerId,
        employee_id: employeeId,
        car_id: carId
    });
    await Car.update({ status: "sold" }, { where: { id: carId } })
    return resMsg(res, 201, "Car Sale Success", sale)
};

// ================= Update Sales =================
export const updateSale = async (req, res, next) => {
    const { id } = req.params
    const sale = await Sale.findByPk(id);
    if (!sale)
        return next(new Error(`the sale with ${id} not found`, { cause: 404 }))
    await sale.update({
        sale_date: req.body.date,
        total_price: req.body.totalPrice,
        customer_id: req.body.customerId,
        employee_id: req.body.employeeId,
        car_id: req.body.carId
    })
    return resMsg(res, 201, "sale update success", sale)
};

// ================= Delete Sales =================
export const deleteSale = async (req, res,next) => {
    const { id } = req.params
    const sale = await Sale.findByPk(id);
    if (!sale)
        return next(new Error(`the sale with ${id} not found`, { cause: 404 }));

    await sale.destroy()
    return resMsg(res,201, "sale deleted success", [])
}