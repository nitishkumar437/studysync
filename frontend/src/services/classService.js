const API_URL = `${import.meta.env.VITE_API_URL}/api/classes`;

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

// Get All Classes
export const getClasses = async () => {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: getHeaders(),
  });

  return handleResponse(response, "Failed to fetch classes");
};

// Get Class By ID
export const getClassById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "GET",
    headers: getHeaders(),
  });

  return handleResponse(response, "Failed to fetch class");
};

// Create Class
export const createClass = async (classData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: getHeaders(true),
    body: JSON.stringify(classData),
  });

  return handleResponse(response, "Failed to create class");
};

// Update Class
export const updateClass = async (id, classData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getHeaders(true),
    body: JSON.stringify(classData),
  });

  return handleResponse(response, "Failed to update class");
};

// Delete Class
export const deleteClass = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  return handleResponse(response, "Failed to delete class");
};
