require("dotenv").config();
const express = require("express");
const connectionDB = require("./db");
const session = require("express-session");
const { app, server } = require("./src/socket/socket");

const PORT = process.env.PORT || "3000";

app.set("views", "./src/views/pages");
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

/*------------------Routes------------------- */
const indexRoute = require("./src/routes/index");
const loginRoute = require("./src/routes/login");
const registerRoute = require("./src/routes/register");
const chatRoute = require("./src/routes/chat");
const messageRoute = require("./src/routes/message");

/*-----------------End routes-----------------*/

/*----------------using routes----------------*/
app.use("/", indexRoute);
app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/chat", chatRoute);
app.use("/chat", messageRoute);

app.use((req, res) => {
  res.status(404).render("404");
});
/*--------------End using routes--------------*/

server.listen(PORT, () => {
  connectionDB();
  console.log(`server listing on port ${PORT}`);
});
