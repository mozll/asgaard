const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const axios = require("axios");

const { body, validationResult } = require("express-validator");
const crypto = require("crypto");
const bcryptjs = require("bcryptjs");
const saltRounds = 10;

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

require("dotenv").config();

const app = express();

const dbHost = process.env.DB_HOST || "localhost";
const dbUser = process.env.DB_USER || "root";
const dbPassword = process.env.DB_PASSWORD || "";
const dbName =
  process.env.NODE_ENV === "production"
    ? process.env.DB_DATABASE || "questzingDB"
    : "questzing-db";
const dbPort = process.env.DB_PORT || 3306;

// create a connection a database with information to use it
const db = mysql.createConnection({
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  database: dbName,
  port: dbPort,
});
// this is needed for handling data sent in the request body as JSON.
app.use(express.json());

// start the server and listen for incoming requests on port 8081
const port = process.env.PORT || 8081;

app.listen(port, () => {
  console.log("listening");
});

// this allows our frontend to access our backend
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://139.144.73.204:5173", // VPS IP with my frontend port
      "http://139.144.73.204:80", // VPS IP with my port 80
      "http://139.144.73.204",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// this allows us to work with cookie-based authentication
app.use(cookieParser());
// parse URL-encoded form data, extended option allows for more complex objects
app.use(bodyParser.urlencoded({ extended: true }));

// express session
app.use(
  session({
    name: "nameOfCookieThatStoresSessionID",
    secret: "longRandomHash",
    resave: false,
    saveUninitialized: false,
    cookie: {
      domain: null,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
      secure: false,
      httpOnly: true,
    },
  })
);

// app.get("/", (req, res) => {
//   return res.json("from backend");
// });

// api call to get everything from the users table, used for initial testing
app.get("/api/users", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// API call to register a user, with valdiation
app.post(
  "/api/register",
  [
    // Validate is to make sure the data we get meets the criteria we want, such as name doesnt already exist or passwords must be this long.
    // Sanitize is cleaning the data we get to make sure it is not harmful
    body("user_email")
      .isEmail()
      .withMessage("Please enter a valid email address")
      .normalizeEmail(),
    body("user_name")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long")
      .trim()
      .escape(),
    body("user_password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long")
      .matches(/\d/)
      .withMessage("Password must contain a number")
      .matches(/[a-z]/)
      .withMessage("Password must contain a lowercase letter")
      .matches(/[A-Z]/)
      .withMessage("Password must contain an uppercase letter")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("Password must contain a special character")
      .trim()
      .escape(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { user_email, user_name, user_password } = req.body;

    // checking if the email already exists
    db.query(
      "SELECT 1 FROM users WHERE user_email = ?",
      [user_email],
      async (err, emailResults) => {
        if (err) {
          console.error("Database error (email check):", err);
          return res.status(500).json({ error: "Database error" });
        }
        if (emailResults.length > 0) {
          return res
            .status(400)
            .json({ error: "Email address is already registered" });
        }

        // checking if the username already exists
        db.query(
          "SELECT 1 FROM users WHERE user_name = ?",
          [user_name],
          async (err, usernameResults) => {
            if (err) {
              console.error("Database error (username check):", err);
              return res.status(500).json({ error: "Database error" });
            }
            if (usernameResults.length > 0) {
              return res
                .status(400)
                .json({ error: "Username is already taken" });
            }

            try {
              // generating a unique avatar image URL for the user using RoboHash
              const imagePath =
                "https://robohash.org/" +
                crypto.createHash("md5").update(user_name).digest("hex");

              // fetch the raw image data from the generated RoboHash URL
              const response = await axios.get(imagePath, {
                responseType: "arraybuffer",
              });

              // converting the raw image data (arraybuffer) into a Buffer object (binary format)
              // this Buffer will be stored in the database along with other user information
              const user_img = Buffer.from(response.data, "binary");

              // hash user password
              const hashedPassword = await bcryptjs.hash(
                user_password,
                saltRounds
              );

              // inserting the new user into the database
              db.query(
                "INSERT INTO users (user_email, user_name, user_password, user_sign_up_date, user_img) VALUES (?, ?, ?, NOW(), ?)",
                [user_email, user_name, hashedPassword, user_img],
                (err, result) => {
                  if (err) {
                    console.error("Database error (user insert):", err);
                    return res.status(500).json({ error: "Database error" });
                  }
                  res.json({ message: "User registered successfully" });
                }
              );
            } catch (error) {
              console.error("Error registering user:", error);
              res
                .status(500)
                .json({ error: "An error occurred during registration" });
            }
          }
        );
      }
    );
  }
);

app.post("/api/update-username", (req, res) => {
  const { userId, newUsername } = req.body;

  if (!userId || !newUsername) {
    return res
      .status(400)
      .json({ error: "User ID and new username are required" });
  }

  const query = "UPDATE users SET user_name = ? WHERE user_id = ?";
  db.query(query, [newUsername, userId], (err, results) => {
    if (err) {
      console.error("Error updating username:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    // Check if any rows were affected by the update
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Username updated successfully" });
  });
});

// login with user
app.post("/api/login", (req, res) => {
  const user_name = req.body.user_name;
  const user_password = req.body.user_password;

  if (!user_name || !user_password) {
    return res
      .status(400)
      .json({ error: "Missing required fields (user_name, user_password)" });
  }

  db.query(
    "SELECT * FROM users WHERE user_name = ?",
    user_name,
    async (err, result) => {
      if (err) {
        console.error("Database Error:", err);
        return res.status(500).json({ error: "Database error" });
      }

      if (result.length === 0) {
        return res.status(401).json({ message: "User doesn't exist" });
      }

      const user = result[0];
      try {
        const isMatch = await bcryptjs.compare(
          user_password,
          user.user_password
        ); // Compares passwords using await
        if (isMatch) {
          const userSessionData = {
            id: user.user_id,
            name: user.user_name,
            email: user.user_email,
          };
          if (user.user_img) {
            userSessionData.img = user.user_img.toString("base64");
          }
          req.session.user = userSessionData;
          res.json({ message: "Login successful", user: req.session.user });
        } else {
          res.status(401).json({ message: "Incorrect password" });
        }
      } catch (error) {
        console.error("Error comparing passwords:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  );
});
// api to check if the user is logged in and return their session data (if available).
app.get("/api/user", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/api/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.sendStatus(500);
    } else {
      console.log("CLEARING SESSION");
      res.clearCookie("nameOfCookieThatStoresSessionID", { path: "/" });
      // res.send({ loggedIn: false });
      res.sendStatus(200);
    }
  });
});

// Creating a review on a game
app.post("/api/games/:gameId/reviews", (req, res) => {
  const { gameId } = req.params;
  const { review, thumbs } = req.body;

  if (!review || !thumbs || isNaN(gameId)) {
    return res.status(400).json({ error: "Invalid data provided" });
  }

  const userId = req.session && req.session.user ? req.session.user.id : null;

  if (!userId) {
    return res.status(401).json({ error: "Error: User not logged in" });
  }

  const sql = `
    INSERT INTO reviews (
      review_rawg_id, 
      review_review, 
      review_thumbs,
      review_user_id
    ) VALUES (?, ?, ?, ?)`;

  const values = [gameId, review, thumbs, userId];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error submitting review:", err);
      res.status(500).json({ error: "Failed to submit review" });
    } else {
      res.status(201).json({ message: "Review submitted successfully" });
    }
  });
});

// Show the reviews on the game
app.get("/api/games/:gameId/reviews", (req, res) => {
  const { gameId } = req.params;

  const sql = `
  SELECT
    reviews.review_id,
    reviews.review_rawg_id,
    reviews.review_review,
    reviews.review_thumbs,
    reviews.review_created_at,
    reviews.review_user_id AS user_id, 
    users.user_name,
    users.user_img
  FROM reviews
  JOIN users ON reviews.review_user_id = users.user_id
  WHERE reviews.review_rawg_id = ?
  ORDER BY reviews.review_created_at DESC;
`;

  db.query(sql, [gameId], (err, rows) => {
    if (err) {
      console.error("Error fetching reviews:", err);
      res.status(500).json({ error: "Failed to fetch reviews" });
    } else {
      res.json(rows);
    }
  });
});

// Deletes your user review
app.delete("/api/games/:gameId/reviews/:reviewId", (req, res) => {
  const { gameId, reviewId } = req.params;

  if (isNaN(gameId) || isNaN(reviewId)) {
    return res.status(400).json({ error: "Invalid game or review ID" });
  }

  const userId = req.session && req.session.user ? req.session.user.id : null;
  if (!userId) {
    return res.status(401).json({ error: "Error: User not logged in" });
  }

  // database deletion (with ownership check)
  const sql = `
    DELETE FROM reviews 
    WHERE review_id = ? 
    AND review_rawg_id = ? 
    AND review_user_id = ?`;

  db.query(sql, [reviewId, gameId, userId], (err, result) => {
    if (err) {
      console.error("Error deleting review:", err);
      return res.status(500).json({ error: "Failed to delete review" });
    }

    // check if any rows were affected
    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Review not found or you are not authorized to delete it",
      });
    } else {
      res.sendStatus(200); // successful deletion
    }
  });
});

// Creating a forum post
app.post("/api/games/:gameId/forum_posts", (req, res) => {
  const { gameId } = req.params;
  const { post_content, post_title } = req.body; // get content and title from request body

  if (!post_content || !post_title || isNaN(gameId)) {
    return res.status(400).json({ error: "Invalid data provided" });
  }

  // sanitizes input from user and puts ' ' marks around text in the database. This together with the VALUES (?,?) protects my database from SQL injections
  const sanitizedTitle = mysql.escape(post_title);
  const sanitizedContent = mysql.escape(post_content);

  const userId = req.session && req.session.user ? req.session.user.id : null;
  if (!userId) {
    return res.status(401).json({ error: "Error: User not logged in" });
  }

  const sql = `
    INSERT INTO forum_posts (
      forum_post_rawg_id,
      forum_post_title,
      forum_post_post,
      forum_post_user_id
    ) VALUES (?, ?, ?, ?)
  `;

  const values = [gameId, sanitizedTitle, sanitizedContent, userId];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error submitting forum post:", err);
      res.status(500).json({ error: "Failed to submit forum post" });
    } else {
      res.status(200).json({
        message: "Forum post submitted successfully",
        forum_post_id: result.insertId,
      });
    }
  });
});

// Show the forum posts on the game
app.get("/api/games/:gameId/forum_posts", (req, res) => {
  const { gameId } = req.params;

  const sql = `
  SELECT
    forum_posts.forum_post_id,
    forum_posts.forum_post_title, 
    forum_posts.forum_post_post,
    forum_posts.forum_post_created_at,
    users.user_name
    FROM forum_posts
    JOIN users ON forum_posts.forum_post_user_id = users.user_id
    WHERE forum_posts.forum_post_rawg_id = ? 
    ORDER BY forum_posts.forum_post_created_at DESC;
  `;

  db.query(sql, [gameId], (err, rows) => {
    if (err) {
      console.error("Error fetching forum posts:", err);
      res.status(500).json({ error: "Failed to fetch forum posts" });
    } else {
      const cleanedPosts = rows.map((post) => ({
        ...post,
        forum_post_title: post.forum_post_title.replace(/^'|'$/g, ""),
        forum_post_post: post.forum_post_post.replace(/^'|'$/g, ""),
      }));
      res.json(cleanedPosts);
    }
  });
});

// Deletes the forum post
app.delete("/api/games/:gameId/forum_posts/:forumPostId", (req, res) => {
  const { gameId, forumPostId } = req.params;

  if (isNaN(gameId) || isNaN(forumPostId)) {
    return res.status(400).json({ error: "Invalid game or review ID" });
  }

  const userId = req.session && req.session.user ? req.session.user.id : null;
  if (!userId) {
    return res.status(401).json({ error: "Error: User not logged in" });
  }

  const sql = `
    DELETE FROM forum_posts 
    WHERE forum_post_id = ? 
    AND forum_post_rawg_id = ? 
    AND forum_post_user_id = ?`;

  db.query(sql, [forumPostId, gameId, userId], (err, result) => {
    if (err) {
      console.error("Error deleting forum post:", err);
      return res.status(500).json({ error: "Failed to delete forum post" });
    }

    // checking if any rows were affected
    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Forum post not found or you are not authorized to delete it",
      });
    } else {
      res.sendStatus(200); // Successful deletion
    }
  });
});

// creating a comment on a forum post
app.post("/api/forum_posts/:postId/comments", (req, res) => {
  const { postId } = req.params;
  let { comment_content } = req.body;

  // validating
  if (!comment_content || isNaN(postId)) {
    return res.status(400).json({ error: "Invalid data provided" });
  }
  // sanitizing
  comment_content = db.escape(comment_content);

  const userId = req.session && req.session.user ? req.session.user.id : null;
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const sql = `
      INSERT INTO comments (forum_post_id, comment_comment, comment_user_id, comment_created_at)
      VALUES (?, ?, ?, NOW())  
  `;

  db.query(sql, [postId, comment_content, userId], (err, result) => {
    if (err) {
      console.error("Error submitting comment:", err);
      return res.status(500).json({ error: "Database error" });
    } else {
      res.status(201).json({ message: "Comment submitted successfully" });
    }
  });
});

// Gets comments for a forum post
app.get("/api/forum_posts/:postId/comments", (req, res) => {
  const postId = req.params.postId;

  // validating
  if (isNaN(postId)) {
    return res.status(400).json({ error: "Invalid forum post ID" });
  }

  const sql = ` SELECT comments.*, users.user_id, users.user_name, forum_posts.forum_post_id
  FROM comments 
  JOIN users ON comments.comment_user_id = users.user_id 
  JOIN forum_posts ON comments.forum_post_id = forum_posts.forum_post_id 
  WHERE comments.forum_post_id = ?
  ORDER BY comment_created_at DESC`;

  db.query(sql, [postId], (err, rows) => {
    if (err) {
      console.error("Error fetching comments:", err);
      return res.status(500).json({ error: "Database error" });
    }
    const cleanedComments = rows.map((comment) => ({
      ...comment,
      comment_comment: comment.comment_comment.replace(/^'|'$/g, ""),
    }));
    res.json(cleanedComments);
  });
});
