import Emplyee from "../../db/models/employee.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


export const register = async (req, res, next) => {
  const { name, email, job, password } = req.body;

  if (!name || !email || !job || !password)
    return next(new Error("كل الحقول مطلوبه", { cause: 400 }));


  const existingEmplyee = await Emplyee.findOne({ where: { email } });

  if (existingEmplyee)
    return next(new Error("الايميل ده مسجل بالفعل", { cause: 400 }));

  const hashedPassword = await bcrypt.hash(password, 10);

  const newEmplyee = await Emplyee.create({
    name,
    email,
    job,
    role: "employee",
    password: hashedPassword,
  });

  res.status(201).json({
    message: "register successfully",
    Emplyee: {
      name: newEmplyee.name,
      email: newEmplyee.email,
      job: newEmplyee.job,
    },
  });
};


// login
export const Login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new Error("من فضلك ادخل الايميل والباسورد", { cause: 400 }));

  const user = await Emplyee.findOne({ where: { email } });

  if (!user)
    return next(new Error("Email or password is incorrect", { cause: 401 }));


  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch)
    return next(new Error("Email or password is incorrect", { cause: 401 }));


  const token = jwt.sign({ id: user.id, role: user.role }, "secret", { expiresIn: "7d" })
  res.status(200).json({
    message: "Login successful",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      job: user.job,
      role: user.role,
      token
    }
  });
};



