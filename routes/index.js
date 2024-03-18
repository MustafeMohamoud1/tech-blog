const router = require('express').Router();
const homeRoutes = require("./homeRoutes");
const userRoutes = require("./userRoutes")

router.use("/", userRoutes);
router.use("/home", homeRoutes);




module.exports = router;

