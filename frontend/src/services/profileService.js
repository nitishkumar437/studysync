const API_URL = `${import.meta.env.VITE_API_URL}/profile`;

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
 
export const getProfile = async () => {
  const response = await fetch(API_URL, {
    headers: getHeaders(),
  });

  return handleResponse(response, "Failed to fetch profile");
};
 
export const updateProfile = async (profileData) => {
  const response = await fetch(API_URL, {
    method: "PUT",
    headers: getHeaders(true),
    body: JSON.stringify(profileData),
  });

  return handleResponse(response, "Failed to update profile");
};
 
export const changePassword = async (passwordData) => {
  const response = await fetch(`${API_URL}/change-password`, {
    method: "PUT",
    headers: getHeaders(true),
    body: JSON.stringify(passwordData),
  });

  return handleResponse(response, "Failed to change password");
};

 
export const uploadProfilePhoto = async (formData) => {
  const response = await fetch(`${API_URL}/upload-photo`, {
    method: "PUT",
    headers: getHeaders(),
    body: formData,
  });

  return handleResponse(response, "Failed to upload profile photo");
};
