const router = require('express').Router();
//create a variable to find the routes created in userRoutes which will be an extension of /api/user/userRoutes(these include /:id params)
const userRoutes = require("./user-routes");
//use the router to forward what comes after /users, and read the paths from the userRoutes file
router.use('/users', userRoutes);

module.exports = router;