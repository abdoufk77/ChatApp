const express = require("express");
const router = express.Router();
const user = require("../models/user.model");

router.get("/", (req, res) => {
  res.render("register");
});

router.post("/", async (req, res) => {
  const { username, password, cpassword } = req.body;

  if (password !== cpassword) {
    return res.render("register", { message: "err password" });
  }

  try {
    const u = new user({
      username: username,
      password: password,
    });

    await u.save();
    res.redirect("/login");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
