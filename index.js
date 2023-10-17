// import express from "express";
// const app = express();
// import path from "path";

// const PORT = 3000;
// const __dirname = path.resolve();
// app.use(express.urlencoded()); //middleware
// import fs from "fs";
// const fn = __dirname + "/userList.csv";
// // const EventEmitter = require("events");
// // import EventEmitter from "events";
// // const eventEmitter = new EventEmitter();

// //subscribe
// // eventEmitter.on("hehe", () => {
// //   console.log("THis is in side hehe event!");
// //complext math
// // });
// // eventEmitter.on("uhu", () => {
// //   console.log("THis is in side hehe event!");
// // });

// //triggre, emit
// // eventEmitter.emit("uhu");
// console.log(__dirname);

// app.get("/registration", (req, res) => {
//   console.log("registration", req.query);
//   res.sendFile(__dirname + "/register.html");
// });

// app.get("/api", (req, res) => {
//   const obj = {
//     message: "server is well api",
//   };
//   res.json(obj);
// });

// app.post("/registration", (req, res) => {
//   const { email, password } = req.body;

//   //store in csv file

//   const str = email + "|" + password + "\n";
//   fs.appendFile(fn, str, (error) => {
//     error ? console.log(error) : console.log("data written in the file");
//   });
//   console.log("registration", req.body);

//   res.send("<h2>Registered Successfully </h2> <a href='/'> Go Back </a>");
// });

// app.get("/login", (req, res) => {
//   console.log("login", req.query);
//   res.sendFile(__dirname + "/login.html");
// });

// app.post("/login", (req, res) => {
//   const { email, password } = req.body;
//   const str = email + "|" + password;
//   console.log(str);
//   //store in csv file
//   fs.readFile(fn, (error, data) => {
//     if (error) {
//       return res.send(error.message);
//     }
//     console.log(data);
//     const users = data.toString();
//     users.includes(str) ? res.send("logged in ") : res.send("invalid Login");
//   });
// });

// app.use("/", (req, res) => {
//   res.send(`<div>
//   <a href="./registration">Register</a>
// <a href="./login">Login</a>
// </div>`);
// });
// app.listen(PORT, (error) => {
//   error
//     ? console.log(error)
//     : console.log("your server is running at http://localhost:" + PORT);
// });
import express from "express";
const app = express();

const PORT = 8000;

import path from "path";
import fs from "fs";

const __dirname = path.resolve();
app.use(express.urlencoded());

const fn = __dirname + "/userList.csv";

// API endpoints
app.get("/kisan", (req, res) => {
  const obj = {
    message: "server is well api",
  };
  res.json(obj);
});

// handle network request ssr

app.get("/registration", (req, res) => {
  console.log("registration", req.query);
  res.sendFile(__dirname + "/register.html");
});

app.post("/registration", (req, res) => {
  const { email, password } = req.body;

  const str = email + "|" + password + "\n";
  //store in csv file
  fs.appendFile(fn, str, (error) => {
    error
      ? console.log(error)
      : console.log("data has been written in the file");
  });

  res.send(
    "<h1>Thank you, you are registered</h1><hr /> <a href='/login.html'>Home</a>"
  );
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const str = email + "|" + password;
  //reding the file and check if email and pass exist

  fs.readFile(fn, (error, data) => {
    if (error) {
      return res.send(error.message);
    }
    const users = data.toString();

    users.includes(str)
      ? res.send("Login successfully")
      : res.send("Invalid login");
  });
});

app.use("/", (req, res) => {
  //we do some server side code exe
  res.send(
    `<div><a href="/registration">Registration</a> <a href="/login">Login</a><h1 style='color:red'>Kishan</h1> <hr /> <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur saepe maiores tempore ullam nobis, voluptas accusamus fugit dolorem veniam veritatis vel obcaecati accusantium. Blanditiis at libero incidunt sequi officiis amet.</p> </div>`
  );
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log("your server is running at http://localhost:" + PORT);
});
