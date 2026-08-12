const API_URL = `${import.meta.env.VITE_API_URL}/api/institute`;

const getToken = () => localStorage.getItem("token");

const getHeaders = (isJson = false) => {
  const headers = {
    Authorization: `Bearer ${getToken()}`,
  };

  if (isJson) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
};

const handleResponse = async (response, message) => {
  const contentType = response.headers.get("content-type");

  let data;

  if (contentType && contentType.includes("application/json")) {
    data = await response.json();
  } else {
    throw new Error("Server returned an invalid response.");
  }

  if (!response.ok) {
    throw new Error(data.message || message);
  }

  return data;
};

// Get Institute Settings
export const getInstitute = async () => {
  const response = await fetch(`${API_URL}/settings`, {
    method: "GET",
    headers: getHeaders(),
  });

  return handleResponse(response, "Failed to fetch institute settings");
};

// Update Institute Settings
export const updateInstitute = async (instituteData) => {
  const response = await fetch(`${API_URL}/settings`, {
    method: "PUT",
    headers: getHeaders(true),
    body: JSON.stringify(instituteData),
  });

  return handleResponse(response, "Failed to update institute settings");
};
