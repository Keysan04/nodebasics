import express from "express";
const app = express();
import path from "path";

const PORT = 8000;
const __dirname = path.resolve();
app.use(express.urlencoded());
import fs from "fs";
const fn = __dirname + "/userList.csv";
// const EventEmitter = require("events");
// import EventEmitter from "events";
// const eventEmitter = new EventEmitter();

//subscribe
// eventEmitter.on("hehe", () => {
//   console.log("THis is in side hehe event!");
//complext math
// });
// eventEmitter.on("uhu", () => {
//   console.log("THis is in side hehe event!");
// });

//triggre, emit
// eventEmitter.emit("uhu");
console.log(__dirname);

app.get("/registration", (req, res) => {
  console.log("registration", req.query);
  res.sendFile(__dirname + "/register.html");
});

app.post("/registration", (req, res) => {
  const { email, password } = req.body;

  //store in csv file

  const str = email + "|" + password + "\n";
  fs.appendFile(fn, str, (error) => {
    error ? console.log(error) : console.log("data written in the file");
  });
  console.log("registration", req.body);
  res.send(
    "<h2>Registered Successfully </h2>" +
      `<a href="./registration"> Go Back </a>`
  );
});

app.get("/login", (req, res) => {
  console.log("login", req.query);
  res.sendFile(__dirname + "/login.html");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const str = email + "|" + password;
  console.log(str);
  //store in csv file
  fs.readFile(fn, (error, data) => {
    if (error) {
      return res.send(error.message);
    }
    console.log(data);
    const users = data.toString();
    users.includes(str) ? res.send("logged in ") : res.send("invalid Login");
  });
});

app.use("/", (req, res) => {
  res.send(`<div>
  <a href="./registration">Register</a>
<a href="./login">Login</a>
</div>`);
});
app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log("your server is running at http://localhost:" + PORT);
});
