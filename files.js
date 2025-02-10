const fs = require("fs"); // fs is a built-in module that stands for file system

// reading files
// fs.readFile("./docs/blog1.txt", (err, data) => {
//   if (err) {
//     console.log(err);
//   }

//   console.log(data.toString());
// });

// writing files
// fs.writeFile("./docs/blog1.txt", "hello, world", () => {
//   console.log("file was written");
// });

// if the file does not exist, it will be created
// fs.writeFile("./docs/blog2.txt", "hello, again", () => {
//   console.log("file was written");
// });

// directories
// this checks if the folder exists before creating it
if (!fs.existsSync("./assets")) {
  // this will create a folder using the path provided
  fs.mkdir("./assets", (err) => {
    if (err) {
      console.log(err);
    }

    console.log("folder created");
  });
} else {
  // this will delete a folder using the path provided
  fs.rmdir("./assets", (err) => {
    if (err) {
      console.log(err);
    }

    console.log("folder deleted");
  });
}

// deleting files
if (fs.existsSync("./docs/deleteme.txt")) {
  fs.unlink("./docs/deleteme.txt", (err) => {
    if (err) {
      console.log(err);
    }

    console.log("file deleted");
  });
}
