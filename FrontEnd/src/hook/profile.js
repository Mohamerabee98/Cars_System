import { useEffect, useState } from "react";

export const useProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:3000/profile/get", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setUser(data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, []);

  return { user, loading };
};