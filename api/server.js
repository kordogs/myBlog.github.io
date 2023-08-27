const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const userModel = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const Post = require("./models/Post");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads")); // lets the client side access the photos
const PORT = 4000; //the port you are going to use
const salt = bcrypt.genSaltSync(10); // to hash your password with level 10 security
const secret = "ediwow";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // 2. destination: function (req, file, cb) { ... }: This is a property of the storage object. It defines a function that determines the destination directory for uploaded files. The function takes three parameters: req (the request object), file (the uploaded file object), and cb (a callback function). The callback function is called with two arguments: null (indicating no error) and the destination directory path.
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // 3. filename: function (req, file, cb) { ... }: This is another property of the storage object. It defines a function that determines the filename for uploaded files. Similar to the destination property, it takes three parameters: req, file, and cb. The callback function is called with two arguments: null (indicating no error) and the filename.
  },
}); // 1. const storage = multer.diskStorage({ ... }): This line declares a constant variable storage and assigns it the value returned by the multer.diskStorage() function. This function is used to configure the storage settings for file uploads.

const upload = multer({ storage: storage }); //creates an instance of the multer middleware with the storage configuration.

mongoose
  .connect(
    "mongodb+srv://myBlog:tI9eJUtvW5FDi9GH@cluster0.zndg2k6.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  ) //This line establishes a connection to the MongoDB database located at mongodb://localhost:27017/MERN. The { useNewUrlParser: true, useUnifiedTopology: true } options are passed to ensure compatibility with the latest version of MongoDB.

  .then(() => {
    console.log("CONNECTED TO DATABASE");
  }) // This block of code is executed when the connection to the database is successfully established. It logs the message "CONNECTED TO DATABASE" to the console.

  .catch((error) => {
    console.error("failed to connect:", error);
  }); //This block of code is executed if there is an error while connecting to the database. It logs the error message to the console.

// ENDPOINTS
app.post("/SignUp", async (req, res) => {
  const { username, password } = req.body; // This line uses destructuring assignment to extract the username and password properties from the req.body object. It assigns the values to the variables username and password.
  const existingUser = await userModel.findOne({ username }); // checks if username already exists
  if (existingUser) {
    res.status(400).json("username already taken");
    return;
  }
  const newUserModel = new userModel({
    username,
    password: bcrypt.hashSync(password, salt),
  }); // This line creates a new instance of the userModel class, passing in an object with the username and password properties. The password property is set to the result of hashing the password value using the bcrypt.hashSync() function.

  newUserModel
    .save()
    .then(() => {
      res.status(200).json("sucessful"); // This line is a callback function that is executed when the promise returned by newUserModel.save() is resolved. It sets the response status to 200 (indicating success) and sends a JSON response with the string "successful".
    })
    .catch((error) => {
      res.status(400).json("failed"); // This line is a callback function that is executed when the promise returned by newUserModel.save() is rejected (i.e., an error occurred during the save operation). It sets the response status to 400 (indicating a bad request) and sends a JSON response with the string "failed".
    }); // This line saves the newUserModel instance to the database. It returns a promise that resolves when the save operation is successful.
}); // This line sets up a route for handling a POST request to the "/SignUp" endpoint. When a POST request is made to this endpoint, the callback function (req, res) => { ... } will be executed.

app.post("/Login", async (req, res) => {
  const { username, password } = req.body;
  await userModel
    .findOne({ username })
    .exec()
    .then((user) => {
      if (!user) {
        //  User not found
        res.status(400).json(false);
        return;
      }

      const passOk = bcrypt.compareSync(password, user.password);
      if (passOk) {
        jwt.sign({ username, id: user._id }, secret, {}, (err, token) => {
          if (err) {
            res.status(400);
          }
          res.cookie("token", token).json({
            id: user._id,
            username,
          });
        });
      } else {
        res.status(401).json(false);
      }
    })
    .catch((error) => {
      res.status(400).json("failed");
    });
});

app.get("/Profile", (req, res) => {
  const token = req.cookies.token;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
  res.json(req.cookies);
});

app.post("/Logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.post("/CreatePost", upload.single("file"), async (req, res) => {
  try {
    const { title, description, content } = req.body;
    const cover = req.file ? req.file.originalname : ""; // Default filename if no file is uploaded
    const time = new Date();

    const token = req.cookies.token;
    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) throw err;
      const postDoc = await Post.create({
        title,
        description,
        content,
        cover,
        time,
        author: info.id,
      });
      res.json(postDoc);
    });
  } catch (error) {
    console.error("Error processing file upload:", error);
    res.status(500).json({ error: "File upload failed" });
  }
});

app.get("/CreatePost", async (req, res) => {
  res.json(
    await Post.find().populate("author", ["username"]).sort({ time: -1 })
  );
}); // post.find()- finds the post and displays it on the client side
// .populate("author", ["username"])- displays the 'username' of the author only
// .sort({ time: -1 }- sorts the posts in descending order

app.get("/ViewPost/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", ["username"]);
  res.json(postDoc);
});

app.put("/UpdatePost", upload.single("file"), async (req, res) => {
  let cover = null;
  if (req.file) {
    const { title, description, content } = req.body;
    cover = req.file ? req.file.originalname : ""; // Default filename if no file is uploaded
    const time = new Date();
  }

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { id, title, description, content } = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      res.status(400).json("You are not the author");
    }
    const newCover = cover ? cover : postDoc.cover;
    await postDoc.updateOne({
      title,
      description,
      content,
      cover: newCover,
    });
    res.json(postDoc);
  });
});

app.delete("/DeletePost", async (req, res) => {
  const { token } = req.cookies;
  const { id } = req.body;
  try {
    if (token) {
      jwt.verify(token, secret, {}, async (err, data) => {
        if (err) throw err;
        const postDoc = await Post.findById(id);
        const isAuthor =
          JSON.stringify(postDoc?.author) === JSON.stringify(data.id);
        if (isAuthor) {
          await Post.findByIdAndDelete(id);
          res.status(200).json({ message: "Post deleted successfully" });
        }
      });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`started at http://localhost:${PORT}`);
});
