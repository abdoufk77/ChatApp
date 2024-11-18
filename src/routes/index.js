const express = require("express");
const user = require("../models/user.model");
const router = express.Router();
const checkAuthenticated = require("../middleware/auth.middelware");

router.get("/", checkAuthenticated, async (req, res) => {
  try {
    const MonUserId = req.session.userId;
    const [u, users] = await Promise.all([
      user.findById(MonUserId),
      user.find({ _id: { $ne: MonUserId } }),
    ]);

    res.render("index", { name: u, Users: users });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
