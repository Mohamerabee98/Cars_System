import { Op } from "sequelize";
import Car from "../../db/models/cars.model.js"
import { resMsg } from "../../utils/globaleMessage.js";

// Get All Cars + filteration
export const getCars = async (req, res) => {
    try {
        const { company, status, maxPrice, minPrice, color } = req.query;
        const filter = {};

        // Filter Car By Company -> localhost:3000/api/cars?company=bmw
        if (company)
            filter.company = { [Op.like]: company.trim() };

        // Filter Car By Status -> localhost:3000/api/cars?status=new
        if (status)
            filter.status = { [Op.like]: status.trim() };

        // Filter Car By Color -> localhost:3000/api/cars?color=red
        if (color)
            filter.color = { [Op.like]: color.trim() };

        if (minPrice)
            filter.price = { ...whereClause.price, [Op.gte]: +minPrice };
        if (maxPrice)
            filter.price = { ...whereClause.price, [Op.lte]: +maxPrice };

        const cars = await Car.findAll({ where: filter });
        if (cars.length === 0)
            return res
                .status(200)
                .json({ success: true, message: "no data", data: [] })
        return res
            .status(200)
            .json({ success: true, message: "get all cars success", data: cars })
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: error.message })
    }
};

// get car By Id
export const getCarById = async (req, res, next) => {
    const { id } = req.params;
    const car = await Car.findByPk(id);
    if (!car)
        return next(new Error(`the car with ${id} not found`, { cause: 404 }));
    resMsg(res, 200, "Get Car Success", car)

};

// add car
export const addCar = async (req, res, next) => {
    const { company, color, price, status,image,stok } = req.body;

    if (!company || !color || !price)
       return next(new Error(`company, color and price are required`, { cause: 400 }));

    const car = await Car.create({
        company,
        color,
        price,
        status,
        image,
        stok
    });
    return resMsg(res, 201, "Create Car Success", car)

};

// update car
export const updateCar = async (req, res, next) => {
    const { id } = req.params;

    const car = await Car.findByPk(id);

    if (!car)
       return next(new Error(`the car with ${id} not found`, { cause: 404 }))

    await car.update(req.body);
    return resMsg(res, 200, "Update Car Success", car)

};

// delete car
export const deleteCar = async (req, res, next) => {
    const { id } = req.params;
    const car = await Car.findByPk(id);

    if (!car)
       return next(new Error(`the car with ${id} not found`, { cause: 404 }))


    await car.destroy();
    return resMsg(res, 200, "Delete Car Success")

};