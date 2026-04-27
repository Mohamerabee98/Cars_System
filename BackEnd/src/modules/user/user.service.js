import Customer from "../../db/models/Customer.model.js";
import Employee from "../../db/models/employee.model.js";
import { resMsg } from "../../utils/globaleMessage.js";


export const getUsers = async (req, res, next) => {
    const { id, role } = req.user;
    const users = await Customer.findAll();
    return resMsg(res, 200, "Get profile success", users);

    // if (role !== "admin")
    //      return next(new Error("Invalid role", { cause: 400 }));
};

export const getUserProfile = async (req, res, next) => {
    const { id, role } = req.user;

    if (role === "customer") {
        const customer = await Customer.findByPk(id, {
            attributes: { exclude: ["password"] },
        });

        if (!customer) return next(new Error("Customer Not Found", { cause: 404 }));
        return resMsg(res, 200, "Get profile success", customer);
    }

    if (role === "employee") {
        const employee = await Employee.findByPk(id, {
            attributes: { exclude: ["password"] },
        });

        if (!employee) return next(new Error("Employee Not Found", { cause: 404 }));
        return resMsg(res, 200, "Get profile success", employee);
    }
    return next(new Error("Invalid role", { cause: 400 }));
};

// update profile
export const updateProfile = async (req, res, next) => {
    const { id, role } = req.user;
    const { role: disable, password, ...body } = req.body
    if (role === "customer") {
        const customer = await Customer.findByPk(id, { attributes: { exclude: ["password"] } });
        if (!customer)
            return next(new Error("cusromer Not Found", { cause: 404 }));
        await customer.update(body)
        resMsg(res, 200, "profile update success", customer);
    };

    if (role === "employee") {
        const employee = await Employee.findByPk(id, { attributes: { exclude: ["password"] } });
        if (!employee)
            return next(new Error("Employee Not Found", { cause: 404 }));
        await employee.update(body)
        resMsg(res, 200, "profile update success", employee);
    }

}

// delete account
export const deleteAccount = async (req, res, next) => {
    const { id, role } = req.user;
    if (role === "customer") {
        const customer = await Customer.findByPk(id);
        if (!customer)
            return next(new Error("cusromer Not Found", { cause: 404 }));
        await customer.destroy()
    };

    if (role === "employee") {
        const employee = await Employee.findByPk(id);
        if (!employee)
            return next(new Error("Employee Not Found", { cause: 404 }));
        await employee.destroy()
    }
    resMsg(res, 200, "Account Deleted success", null);

}
