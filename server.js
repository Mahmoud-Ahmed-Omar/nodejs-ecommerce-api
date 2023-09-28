const express = require("express");
const morgan = require("morgan");
const dbConnection = require("./config/database");
const ApiError = require("./utils/ApiError");
const globalError = require("./middlewares/ApiError");
const CategoryRouter = require("./routes/CategoryRoutes");
const {getCategoryValidator, createCategoryValidator, updateCategoryValidator, deleteCategoryValidator} = require('./utils/validators/categoryValidator');


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

app.post("/api/v1/categories",createCategoryValidator, StoreCategory);
app.get("/api/v1/categories", GetCategory);
app.get("/api/v1/categories/:id",getCategoryValidator, GetCategoryById);
app.put("/api/v1/categories/:id",updateCategoryValidator ,UpdateCategory);
app.delete("/api/v1/categories/:id",deleteCategoryValidator ,DeleteCategory);

app.all("*", (req, res, next) => {
  next(new ApiError(`Not Found! ${req.originalUrl}`, 404));
});
// Global Error handling middleware for express
app.use(globalError);

const server = app.listen(process.env.PORT, () => {
  console.log(`App Running on port ${process.env.PORT}`);
});

// Handle  Asynchronous Rejection outside express
process.on('unhandledRejection', (error) => {
  console.log(`UnhandledRejection Errors : ${error.name} | ${error.message}`);
  server.close(() => {
    console.log('Shutting Down.....');
    process.exit(1);
  });
});
