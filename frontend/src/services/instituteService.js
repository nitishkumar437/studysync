const API_URL = `${import.meta.env.VITE_API_URL}/api/institute`;

const getToken = () => localStorage.getItem("token");

const getHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
});

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
  const formData = new FormData();

  formData.append("name", instituteData.name);
  formData.append("email", instituteData.email);
  formData.append("phone", instituteData.phone);
  formData.append("address", instituteData.address);

  if (instituteData.logo) {
    formData.append("logo", instituteData.logo);
  }

  const response = await fetch(`${API_URL}/settings`, {
    method: "PUT",
    headers: getHeaders(),
    body: formData,
  });

  return handleResponse(response, "Failed to update institute settings");
};
