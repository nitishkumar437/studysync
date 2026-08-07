const AUTH_API = `${import.meta.env.VITE_API_URL}/api/auth`;
const INSTITUTE_API = `${import.meta.env.VITE_API_URL}/api/institute`;

// Login
export const loginUser = async (userData) => {
  const response = await fetch(`${AUTH_API}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  return response.json();
};

// Register Institute (Only Once)
export const registerInstitute = async (instituteData) => {
  const response = await fetch(`${INSTITUTE_API}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(instituteData),
  });

  return response.json();
};

// Get Current User
export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${AUTH_API}/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};
