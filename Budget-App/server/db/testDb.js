const db = require("./dbConfig");

db.any("SELECT NOW()") // Simple query to check connection
  .then((result) => {
    console.log("Database connected! ✅", result);
    process.exit();
  })
  .catch((error) => {
    console.error("Database connection failed ❌", error);
    process.exit(1);
  });