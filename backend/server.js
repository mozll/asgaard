const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const axios = require("axios");

const crypto = require("crypto");
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
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
  })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    name: "nameOfCookieThatStoresSessionID",
    secret: "longRandomHash",
    resave: false,
    saveUninitialized: false,
    // Expires is for cookie age, and maxAge is for the user session inside of the cookie
    cookie: { expires: 60 * 60 * 24, maxAge: 60 * 60 * 24 * 1000 },
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

app.post("/register", async (req, res) => {
  const { user_email, user_name, user_password } = req.body;

  try {
    // Generate RoboHash URL
    const imagePath =
      "https://robohash.org/" +
      crypto.createHash("md5").update(user_name).digest("hex");

    // Fetch image data
    const response = await axios.get(imagePath, {
      responseType: "arraybuffer",
    });
    const user_img = Buffer.from(response.data, "binary");

    // Hash user password
    const hashedPassword = await bcrypt.hash(user_password, saltRounds);

    // Database query
    db.query(
      "INSERT INTO users (user_email, user_name, user_password, user_sign_up_date, user_img) VALUES (?, ?, ?, NOW(), ?)",
      [user_email, user_name, hashedPassword, user_img],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Database error" });
        }
        res.json({ message: "User registered successfully" });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching image or hashing password" });
  }
});

app.post("/login", (req, res) => {
  const user_name = req.body.user_name;
  const user_password = req.body.user_password;

  // Input Validation (Basic)
  if (!user_name || !user_password) {
    return res
      .status(400)
      .json({ error: "Missing required fields (user_name, user_password)" });
  }

  db.query(
    "SELECT * FROM users WHERE user_name = ?",
    user_name,
    (err, result) => {
      if (err) {
        console.error("Database Error:", err);
        return res.status(500).json({ error: "Database error" });
      }

      if (result.length === 0) {
        return res.status(401).json({ message: "User doesn't exist" });
      }

      const user = result[0];

      bcrypt.compare(user_password, user.user_password, (error, response) => {
        if (response) {
          // Passwords match
          const userSessionData = {
            id: user.user_id,
            name: user.user_name,
            email: user.user_email,
          };

          // Handle user_img (BLOB data)
          if (user.user_img) {
            userSessionData.img = user.user_img.toString("base64");
          }

          req.session.user = userSessionData;
          res.json({ message: "Login successful", user: req.session.user });
        } else {
          res.status(401).json({ message: "Incorrect password" });
        }
      });
    }
  );
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.sendStatus(500); // Send an error status
    } else {
      console.log("CLEARING SESSION");
      res.clearCookie("nameOfCookieThatStoresSessionID", { path: "/" });
      // res.send({ loggedIn: false });
      res.sendStatus(200);
    }
  });
});

app.get("/user", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});
