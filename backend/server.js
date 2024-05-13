const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();

app.use(express.json());

app.listen(8081, () => {
  console.log("listening");
});

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "nameOfCookieThatStoresSessionID",
    secret: "longRandomHash",
    resave: false,
    saveUninitialized: false,
    cookie: { expires: 60 * 60 * 24 },
  })
);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

app.get("/", (req, res) => {
  return res.json("from backend");
});

app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/register", (req, res) => {
  const user_email = req.body.user_email;
  const user_name = req.body.user_name;
  const user_password = req.body.user_password;

  bcrypt.hash(user_password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    db.query(
      "INSERT INTO users (user_email, user_name, user_password, user_sign_up_date) VALUES (?, ?, ?, NOW())",
      [user_email, user_name, hash],
      (err, result) => {
        console.log(err);
      }
    );
  });
});

app.post("/login", (req, res) => {
  const user_name = req.body.user_name;
  const user_password = req.body.user_password;

  db.query(
    "SELECT * FROM users WHERE user_name = ?",
    user_name,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        bcrypt.compare(
          user_password,
          result[0].user_password,
          (error, response) => {
            if (response) {
              req.session.user = {
                id: result[0].user_id,
                name: result[0].user_name,
                email: result[0].user_email,
              };
              res.send({ message: "Login successful", user: req.session.user });
            } else {
              res.send({ message: "Wrong username/password combo!" });
            }
          }
        );
      } else {
        res.send({ message: "User doesn't exist" });
      }
    }
  );
});

app.post("/logout", (req, res) => {
  req.session.destroy(); // Destroy the session on logout
  res.sendStatus(200); // Or send a success message
});

app.get("/user", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});
