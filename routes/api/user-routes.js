//require the router express method, so that we can use router for all routes we create amongst each file
const router = require('express').Router();
//require the User model to perform CRUD operations
const { User } = require("../../models");

//GET /api/users
router.get("/", (req,res) => {
    //access our User model, and get all users back using findAll
    User.findAll({
        attributes: {exclude: ['password']}
    })
    .then(userData => res.json(userData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

});

//get /api/users/1
router.get("/:id", (req,res) => {
    //access our user model, and get a single user back based on req.params.id
    User.findOne({
        attributes: {exclude: ['password']},
        where: {
            id: req.params.id
        }
    }).then(userData => {
        if(!userData) {
            res.status(400).json({message: 'No user found with this ID'});
            return;
        }
        res.json(userData);
    }).catch(err => {
        res.status(500).json(err);
    })

});

//POST api/users
router.post("/", (req,res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }).then(userData => res.json(userData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err);
    })

});

//POST login
router.post("/login", (req,res) => {
    //query operation to validate login
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(userData => {
        if(!userData) {
            res.status(400).json({message: 'no user found with that email'});
            return;
        }
        //verify the user
        const validPassword = userData.checkPassword(req.body.password);
        if(!validPassword) {
            res.status(400).json({message: "incorrect password"});
            return;
        }
        res.json({user:userData, message: 'You are now logged in!'});

    });
});






//PUT /api/users/1
router.put("/:id", (req,res) => {

    User.update(req.body, {
        individualHooks: true,
        where: {
          id: req.params.id
        }
      }).then(userData => {
        if(!userData[0]) {
            res.status(404).json({message: 'No user found with this ID'});
            return;
        }
        res.json(userData);
    }).catch(err => {
        console.log(err)
        res.status(500).json(err);
    })

});

//DELETE /api/users/1
router.delete("/:id", (req,res) => {

    User.destroy({
        where: {
            id: req.params.id
        }
    }).then(userData => {
        if(!userData){
            res.status(404).json({message: 'No user found with this ID'});
            return;
        }
        res.json(userData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

});

module.exports = router;