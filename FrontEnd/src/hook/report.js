import { useEffect, useState } from "react";

export const useReport = () => {
  const [stats, setStats] = useState({});
  const [cars, setCars] = useState([]);
  const [sales, setSales] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const [usersRes, carsRes, salesRes, servicesRes] =
          await Promise.all([
            fetch("http://localhost:3000/profile/users", {
              headers: { Authorization: `Bearer ${token}` },
            }),
            fetch("http://localhost:3000/api/cars", {
              headers: { Authorization: `Bearer ${token}` },
            }),
            fetch("http://localhost:3000/api/sales", {
              headers: { Authorization: `Bearer ${token}` },
            }),
            fetch("http://localhost:3000/api", {
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);

        const users = await usersRes.json();
        const cars = await carsRes.json();
        const sales = await salesRes.json();
        const services = await servicesRes.json();


        const statsData = {
          customers: users.data.length,
          cars: cars.data.length,
          sales: sales.data.length,
          revenue: sales.data.reduce((acc, s) => acc + Number(s.total_price), 0),
          services: services.data.length,
        };

        setStats(statsData);
        setCars(cars.data);
        setSales(sales.data);
        setServices(services.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return { stats, cars, sales, services };
};