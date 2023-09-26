const express = require("express");
const { StoreCategory } = require("../services/CategoryService");
const router = express.Router();

router.post("/", StoreCategory);

module.exports = router;
