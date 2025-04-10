export const someFunction = () => {
};

export const formatText = (text) => {
  return text.toUpperCase(); 
};

export const isValidImageUrl = (url) => {
  return url.match(/\.(jpeg|jpg|gif|png)$/) != null; 
};