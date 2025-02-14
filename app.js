const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

// setup express app
const app = express();

// connect to mongodb
const dbURI =
  "mongodb+srv://Nika:-QsMEMyyRUTCJ88@node-netninja.scmrs.mongodb.net/node-netninja?retryWrites=true&w=majority&appName=node-netninja";

mongoose
  .connect(dbURI)
  .then((result) => {
    // listen for requests
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

// register view engine
app.set("view engine", "ejs");
// app.set("views", "folder_name");

// middleware and static files
app.use(express.static("public"));
app.use(morgan("dev"));

// mongoose and mongo sandbox routes
app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "New blog 2",
    snippet: "About my new blog",
    body: "More about my new blog",
  });

  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/all-blogs", (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

app.get("/single-blog", (req, res) => {
  Blog.findById("67af0c61caa1226c97ce2a81")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

app.get("/", (req, res) => {
  const blogs = [
    {
      title: "Yoshi finds eggs",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "Mario finds stars",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "How to defeat bowser",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
  ];

  res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
  //   res.send("<p>About page</p>");
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
