const express = require("express");
const morgan = require("morgan");
const dbConnection = require("./config/database");
const ApiError = require("./utils/ApiError");
const globalError = require("./middlewares/ApiError");
const CategoryRouter = require("./routes/CategoryRoutes");
const {
  StoreCategory,
  GetCategory,
  GetCategoryById,
  UpdateCategory,
  DeleteCategory,
} = require("./services/CategoryService");
dbConnection();

const app = express();
app.use(express.json());
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.post("/api/v1/categories", StoreCategory);
app.get("/api/v1/categories", GetCategory);
app.get("/api/v1/categories/:id", GetCategoryById);
app.put("/api/v1/categories/:id", UpdateCategory);
app.delete("/api/v1/categories/:id", DeleteCategory);

app.all("*", (req, res, next) => {
  next(new ApiError(`Not Found! ${req.originalUrl}`, 404));
});
// Global Error handling middleware
app.use(globalError);

app.listen(process.env.PORT, () => {
  console.log(`App Running on port ${process.env.PORT}`);
});
