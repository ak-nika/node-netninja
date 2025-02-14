const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

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
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  //   res.send("<p>About page</p>");
  res.render("blogs/about", { title: "About" });
});

// blog routes
app.use("/blogs", blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render("blogs/404", { title: "404" });
});
