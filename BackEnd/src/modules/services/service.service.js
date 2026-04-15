import Service from "../../db/models/service.model.js";


// ================= CREATE SERVICE =================

export const createService = async (req, res, next) => {

  const { name, description, price, duration, category, status } = req.body;

  const service = await Service.create({
    name,
    description,
    price,
    duration,
    category,
    status,
  });

  res.status(201).json({
    success: true,
    message: "Service created successfully",
    data: service,
  });

};


// ================= GET ALL SERVICES =================

export const getAllServices = async (req, res, next) => {

  const services = await Service.findAll();

  res.status(200).json({
    success: true,
    data: services
  });

};


// ================= GET SERVICE BY ID =================

export const getServiceById = async (req, res, next) => {

  const { id } = req.params;

  const service = await Service.findByPk(id);

  if (!service) {
    const error = new Error("Service not found");
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({
    success: true,
    data: service
  });

};


// ================= UPDATE SERVICE =================

export const updateService = async (req, res, next) => {

  const { id } = req.params;

  const service = await Service.findByPk(id);

  if (!service) {
    const error = new Error("Service not found");
    error.statusCode = 404;
    throw error;
  }

  await service.update(req.body);

  res.status(200).json({
    success: true,
    message: "Service updated successfully",
    data: service,
  });

};


// ================= DELETE SERVICE =================

export const deleteService = async (req, res, next) => {

  const { id } = req.params;

  const service = await Service.findByPk(id);

  if (!service) {
    const error = new Error("Service not found");
    error.statusCode = 404;
    throw error;
  }

  await service.destroy();

  res.status(200).json({
    success: true,
    message: "Service deleted successfully",
  });

};