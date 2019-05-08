var router = require("express").Router();
var usersController = require("../../controllers/usersController");
var passport = require("../../config/passport");

// Matches with "/api/users"
router.route("/")
.get(usersController.findAll)
.post(usersController.create);

// Matches with "/api/users/populated"
router.route("/populated")
  .get(usersController.populate);

  router.route("/signup")
  .post(usersController.create);

  //find user if login exists
  router.route("/login")
  .post(passport.authenticate("local"), function(req, res) {
    //redirect them to page..
    res.json("/search");
  });

module.exports = router;
