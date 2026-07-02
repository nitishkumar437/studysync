const API_URL = `${import.meta.env.VITE_API_URL}/notes`;

const getToken = () => localStorage.getItem("token");

const handleResponse = async (response, message) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || message);
  }

  return data;
};

const getHeaders = (isJson = false) => {
  const headers = {
    Authorization: `Bearer ${getToken()}`,
  };

  if (isJson) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
};

export const getNotes = async () => {
  const response = await fetch(API_URL, {
    headers: getHeaders(),
  });

  return handleResponse(response, "Failed to fetch notes");
};

export const createNote = async (note) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: getHeaders(true),
    body: JSON.stringify(note),
  });

  return handleResponse(response, "Failed to create note");
};

export const updateNote = async (id, note) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getHeaders(true),
    body: JSON.stringify(note),
  });
  return handleResponse(response, "Failed to update note");
};

export const deleteNote = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  return handleResponse(response, "Failed to delete note");
};
