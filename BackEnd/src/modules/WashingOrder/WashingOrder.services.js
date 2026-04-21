import WashingOrder from "../../db/models/WashingOrder.model.js";

export const createOrder = async (req, res) => {
  const order = await WashingOrder.create(req.body);
  res.status(201).json(order);
};

export const getAllOrders = async (req, res) => {
  const orders = await WashingOrder.findAll();
  console.log(orders);
  res.json(orders);
};

// export const getOrder = async (req, res) => {
//   try {
//     const order = await WashingOrder.findByPk(req.params.id);

//     if (!order) {
//       return res.status(404).json({ message: "Not found" });
//     }

//     res.json(order);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// export const updateOrder = async (req, res) => {
//   try {
//     const order = await WashingOrder.findByPk(req.params.id);

//     if (!order) {
//       return res.status(404).json({ message: "Not found" });
//     }

//     await order.update(req.body);
//     res.json(order);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// export const deleteOrder = async (req, res) => {
//   try {
//     const order = await WashingOrder.findByPk(req.params.id);

//     if (!order) {
//       return res.status(404).json({ message: "Not found" });
//     }

//     await order.destroy();
//     res.json({ message: "Deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
