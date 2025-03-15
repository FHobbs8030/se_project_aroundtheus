import("./pages/index.css")
  .then(() => {
    console.log("CSS Loaded Successfully");
  })
  .catch((err) => {
    console.error("Error loading CSS:", err);
  });
