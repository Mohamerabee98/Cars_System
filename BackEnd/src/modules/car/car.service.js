import { Op } from "sequelize";
import Car from "../../db/models/cars.model.js"

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
        if (cars.length  === 0)
            return res
                .status(200)
                .json({ success: true, message: "no data", data:[] })
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
export const getCarById = async (req, res) => {
    try {
        const { id } = req.params;
        const car = await Car.findByPk(id);
        if (!car)
            return res.status(404).json({ success: false, message: `the car with ${id} not found` });
        return res
            .status(200)
            .json({ success: true, message: "get car success", data: car })
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: error.message })
    }
};

// add car
export const addCar = async (req, res) => {
    try {
        const { company, color, price, status } = req.body;

        if (!company || !color || !price) {
            return res.status(400).json({
                success: false,
                message: "company, color and price are required",
            });
        };
        const car = await Car.create({
            company,
            color,
            price,
            status
        });
        return res
            .status(201)
            .json({ success: true, message: "create car success", data: car })
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: error.message })
    }
};

// update car
export const updateCar = async (req, res) => {
    try {
        const { id } = req.params;

        const car = await Car.findByPk(id);

        if (!car) {
            return res.status(404).json({
                success: false,
                message: `the car with ${id} not found`
            });
        }

        await car.update(req.body);

        return res.status(200).json({
            success: true,
            message: "update car success",
            data: car
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// delete car
export const deleteCar = async (req, res) => {
    try {
        const { id } = req.params;
        const car = await Car.findByPk(id);

        if (!car)
            return res.status(404).json({ success: false, message: `the car with ${id} not found` });

        await car.destroy();

        return res.status(200).json({ success: true, message: "delete car success" });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};