const API_URL = `${import.meta.env.VITE_API_URL}/api/subjects`;

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

// Get All Subjects
export const getSubjects = async () => {
  const response = await fetch(API_URL, {
    headers: getHeaders(),
  });

  return handleResponse(response, "Failed to fetch subjects");
};

// Get Subject By ID
export const getSubjectById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    headers: getHeaders(),
  });

  return handleResponse(response, "Failed to fetch subject");
};

// Create Subject
export const createSubject = async (subjectData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: getHeaders(true),
    body: JSON.stringify(subjectData),
  });

  return handleResponse(response, "Failed to create subject");
};

// Update Subject
export const updateSubject = async (id, subjectData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getHeaders(true),
    body: JSON.stringify(subjectData),
  });

  return handleResponse(response, "Failed to update subject");
};

// Delete Subject
export const deleteSubject = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  return handleResponse(response, "Failed to delete subject");
};
