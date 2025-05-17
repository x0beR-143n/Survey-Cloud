const express = require("express");
const app = express();
const db = require("./models");
const userRoutes = require("./routes/user.routes");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Route
app.use("/users", userRoutes);

// DB Sync
db.sequelize.sync().then(() => {
  console.log("Synced with MySQL DB");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
