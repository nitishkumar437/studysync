const API_URL = `${import.meta.env.VITE_API_URL}/api/teachers`;

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
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || message);
  }

  return data;
};

// Get All Teachers
export const getTeachers = async () => {
  const response = await fetch(API_URL, {
    headers: getHeaders(),
  });

  return handleResponse(response, "Failed to fetch teachers");
};

// Get Teacher By ID
export const getTeacherById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    headers: getHeaders(),
  });

  return handleResponse(response, "Failed to fetch teacher");
};

// Create Teacher
export const createTeacher = async (teacherData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: getHeaders(true),
    body: JSON.stringify(teacherData),
  });

  return handleResponse(response, "Failed to create teacher");
};

// Update Teacher
export const updateTeacher = async (id, teacherData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getHeaders(true),
    body: JSON.stringify(teacherData),
  });

  return handleResponse(response, "Failed to update teacher");
};

// Delete Teacher
export const deleteTeacher = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  return handleResponse(response, "Failed to delete teacher");
};
