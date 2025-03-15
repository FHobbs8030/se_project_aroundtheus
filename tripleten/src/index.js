// import "../pages/index.css";
import Card from "./components/Card";
import("../pages/index.css")
  .then(() => {
    console.log("CSS Loaded Successfully");
  })
  .catch((err) => {
    console.log("Error loading CSS:", err);
  });

console.log("Hello, Webpack!");
