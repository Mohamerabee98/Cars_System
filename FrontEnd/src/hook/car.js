import { useEffect, useState } from "react";

export const useCar = () => {
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCar = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:3000/api/cars", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setCar(data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getCar();
  }, []);

  return { car, loading };
};