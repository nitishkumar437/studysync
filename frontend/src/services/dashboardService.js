const API_URL = `${import.meta.env.VITE_API_URL}/dashboard`;

const getToken = () => localStorage.getItem("token");

const getHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
});

export const getDashboardStats = async () => {
  const response = await fetch(API_URL, {
    headers: getHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch dashboard data");
  }

  return data;
};
