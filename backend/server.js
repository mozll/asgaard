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
    cookie: {
      domain: null,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
      secure: false,
      httpOnly: true,
    },
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

// Creating a review on a game
app.post("/api/games/:gameId/reviews", (req, res) => {
  const { gameId } = req.params;
  const { review, thumbs } = req.body;

  // 1. Validation:
  if (!review || !thumbs || isNaN(gameId)) {
    return res.status(400).json({ error: "Invalid data provided" });
  }

  // 2. Get User ID:
  const userId = req.session && req.session.user ? req.session.user.id : null;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized: User not logged in" });
  }

  // 3. Database Insertion:
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

  // 1. Validation
  if (isNaN(gameId) || isNaN(reviewId)) {
    return res.status(400).json({ error: "Invalid game or review ID" });
  }

  // 2. Authentication & Authorization
  const userId = req.session && req.session.user ? req.session.user.id : null;
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized: User not logged in" });
  }

  // 3. Database Deletion (with ownership check)
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

    // Check if any rows were affected
    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Review not found or you are not authorized to delete it",
      });
    } else {
      res.sendStatus(200); // Successful deletion
    }
  });
});

// Creating a forum post
app.post("/api/games/:gameId/forum_posts", (req, res) => {
  const { gameId } = req.params;
  const { post_content, post_title } = req.body; // Get title from request body

  if (!post_content || !post_title || isNaN(gameId)) {
    return res.status(400).json({ error: "Invalid data provided" });
  }

  // santizes input from user and puts ' ' marks around text in the database. This together with the VALUES (?,?) protects my database from SQL injections
  const sanitizedTitle = mysql.escape(post_title);
  const sanitizedContent = mysql.escape(post_content);

  const userId = req.session && req.session.user ? req.session.user.id : null;
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized: User not logged in" });
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
    return res.status(401).json({ error: "Unauthorized: User not logged in" });
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

    // Checks if any rows were affected
    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Forum post not found or you are not authorized to delete it",
      });
    } else {
      res.sendStatus(200); // Successful deletion
    }
  });
});

// NOT IMPLEMENTED YET
// Creating a comment on a forum post
app.post("/api/forum_posts/:postId/comments", (req, res) => {
  const { postId } = req.params;
  let { comment_content } = req.body;

  // Input Validation
  if (!comment_content || isNaN(postId)) {
    return res.status(400).json({ error: "Invalid data provided" });
  }
  // Sanitizing
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
  const postId = req.params.postId; // Using postId for consistency

  // Input Validation
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
