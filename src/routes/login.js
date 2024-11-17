const express = require("express");
const user = require("../models/user.model");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("login");
});

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    const u = await user.findOne({ username: username });
    if (u && u.password === password) {
      req.session.userId = u.id;
      return res.redirect("/");
    } else {
      return res.render("login", { msg: "email or password invalid" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
