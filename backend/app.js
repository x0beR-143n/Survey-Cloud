const express = require("express");
const app = express();
const db = require("./models");
const formRoutes = require("./routes/form.routes");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Routes
app.use("/forms", formRoutes); // Thêm route mới cho forms

// DB Sync
db.sequelize.sync().then(() => {
  console.log("Synced with MySQL DB");
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});