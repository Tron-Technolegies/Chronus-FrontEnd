export const extractErrorMessage = (err, fallback = "An unexpected error occurred. Please try again.") => {
  if (!err) return fallback;

  // Network or timeout errors
  if (err.code === "ECONNABORTED" || err.message?.includes("timeout")) {
    return "Request timed out. Please check your connection and try again.";
  }
  if (err.message === "Network Error") {
    return "Network error. Please check your internet connection and try again.";
  }

  const response = err.response;
  if (!response) {
    return err.message || fallback;
  }

  const status = response.status;
  const data = response.data;

  // Direct string response
  if (typeof data === "string") {
    return data;
  }

  if (data && typeof data === "object") {
    // Standard DRF detail / message / error keys
    if (typeof data.detail === "string") return data.detail;
    if (typeof data.message === "string") return data.message;
    if (typeof data.error === "string") return data.error;

    // DRF non_field_errors
    if (Array.isArray(data.non_field_errors) && data.non_field_errors.length > 0) {
      return data.non_field_errors.join(" ");
    }

    // DRF field-specific validation errors: { field: ["error"] }
    const fieldMessages = [];
    for (const [key, val] of Object.entries(data)) {
      const fieldName = key.replace(/_/g, " ");
      if (Array.isArray(val) && val.length > 0) {
        fieldMessages.push(`${fieldName}: ${val.join(" ")}`);
      } else if (typeof val === "string") {
        fieldMessages.push(`${fieldName}: ${val}`);
      }
    }

    if (fieldMessages.length > 0) {
      return fieldMessages.join(" | ");
    }
  }

  // Fallbacks by status code
  if (status === 400) return "Invalid request. Please check your details and try again.";
  if (status === 401) return "Session expired or unauthorized. Please log in.";
  if (status === 403) return "You do not have permission to perform this action.";
  if (status === 404) return "Requested resource was not found.";
  if (status >= 500) return "Server error. Please try again later.";

  return err.message || fallback;
};
