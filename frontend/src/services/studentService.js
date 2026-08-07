const API_URL = `${import.meta.env.VITE_API_URL}/api/students`;

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

// Get All Students
export const getStudents = async () => {
  const response = await fetch(API_URL, {
    headers: getHeaders(),
  });

  return handleResponse(response, "Failed to fetch students");
};

// Get Student By Id
export const getStudentById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    headers: getHeaders(),
  });

  return handleResponse(response, "Failed to fetch student");
};

// Create Student
export const createStudent = async (studentData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: getHeaders(true),
    body: JSON.stringify(studentData),
  });

  return handleResponse(response, "Failed to create student");
};

// Update Student
export const updateStudent = async (id, studentData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getHeaders(true),
    body: JSON.stringify(studentData),
  });

  return handleResponse(response, "Failed to update student");
};

// Delete Student
export const deleteStudent = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  return handleResponse(response, "Failed to delete student");
};
