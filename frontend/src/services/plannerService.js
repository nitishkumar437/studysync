const API_URL = `${import.meta.env.VITE_API_URL}/api/planner`;

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

export const getPlanners = async () => {
  const response = await fetch(API_URL, {
    headers: getHeaders(),
  });

  return response.json();
};

export const createPlanner = async (planner) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: getHeaders(true),
    body: JSON.stringify(planner),
  });

  return response.json();
};

export const updatePlanner = async (id, planner) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getHeaders(true),
    body: JSON.stringify(planner),
  });

  return response.json();
};

export const deletePlanner = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  return response.json();
};

export const togglePlannerStatus = async (id) => {
  const response = await fetch(`${API_URL}/${id}/status`, {
    method: "PATCH",
    headers: getHeaders(),
  });

  return response.json();
};
