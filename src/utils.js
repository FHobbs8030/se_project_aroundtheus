// utils.js - Helper functions for your project

console.log("Utils.js Module Loaded");

// Example function to log something
export const someFunction = () => {
  console.log("Some function in utils.js is called");
};

// Example of a function to format text
export const formatText = (text) => {
  console.log("Formatting text: ", text);
  return text.toUpperCase(); // For example, convert text to uppercase
};

// Example function to validate an image URL
export const isValidImageUrl = (url) => {
  console.log("Validating image URL: ", url);
  return url.match(/\.(jpeg|jpg|gif|png)$/) != null; // Simple regex check for image extensions
};
