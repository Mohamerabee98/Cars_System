import Customer from "../../db/models/Customer.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
export const register = async (req, res ) => {
  try {
    const { name, email, phone, national_id, password, confirmPassword , terms  } = req.body;

     if (!name || !email || !phone || !national_id || !password || !confirmPassword || !terms) {
      return res.status(400).json({ message: "كل الحقول مطلوبه" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "الباسورد غير مطابق" });
    }

    const existingCustomer = await Customer.findOne({ where: { email } });

    if (existingCustomer) {
      return res.status(400).json({ message: "الايميل ده مسجل بالفعل" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newCustomer = await Customer.create({
      name,
      email,
      phone,
      national_id,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "register successfully",
      customer: {
        name: newCustomer.name,
        email: newCustomer.email,
        phone: newCustomer.phone,
      },
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// login


export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "من فضلك ادخل الايميل والباسورد",
      });
    }

    const user = await Customer.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        message: "Email or password is incorrect",
      });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Email or password is incorrect",
      });
    };

    const token = jwt.sign({name: user.name, email: user.email , role : user.role},"secret")

    res.status(200).json({
      message: "Login successful",
      user: { name: user.name, email: user.email , phone : user.phone ,token},
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
