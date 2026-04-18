const cl = console.log;
// for geting http
// const http = require('http')
// insede node many module there but we import only http module to use it
// const http = require("http");

cl("hi NodeJS");

// userArr is DB
// const users = [
//   {
//     id: "u1",
//     fname: "Vishnu",
//     lname: "Jirge",
//     email: "vishnujirge@example.com",
//     contact: "9876543210",
//     userRole: "USER",
//   },
//   {
//     id: "u3",
//     fname: "Ganesh",
//     lname: "Bhalke",
//     email: "ganesh@example.com",
//     contact: "9988776655",
//     userRole: "USER",
//   },
// ];

// if we run any app like angular that will run on port
// localhost : 4200

// React app will run on port like
//localhost : 3000

// we are runing this in local system not on host
// we use this post

// localhost//3000/postData
// process.env.PORT || 3000; this will help like : vercel/port : it will allow to take that port/url
// for deply env provede/ help
// we dont use here express for now
// ✅ dynamic port (important for deployment like :contentReference[oaicite:0]{index=0})

// ❌
// const PORT = process.env.PORT || 3000;

// 👨‍💻method : GET and url = localhost://3000/api/users👨‍💻
// FE send request BE - BE send Response

// we are createing a server
// ✅ create server with request handler
//✅“The createServer method in Node.js accepts a callback function with request and
// response parameters, which is used to handle incoming HTTP requests and send responses.”

// const server = http.createServer((req , res)=>{
//     if(req.url === "api/users" && req.method === "GET"){
//             res.writeHead(200,{'Content-type':'application/json'})
//             return res.end(users)
//     }
// })

// ➡️now we use here express
//express imported here
const express = require("express");
// cors is midellware  .. asscess proveded onlly this site now empty so it worky anywhere
const cors = require("cors");   
const { error } = require("node:console");
// we created here an apk of express
const app = express();

const PORT = 3000;

app.use(cors());
// userArr is DB
const users = [
  {
    id: "123",
    fname: "Vishnu",
    lname: "Jirge",
    email: "vishnujirge@example.com",
    contact: "9876543210",
    userRole: "ADMIN",
  },
  {
    id: "124",
    fname: "Ganesh",
    lname: "Bhalke",
    email: "ganesh@example.com",
    contact: "9988776655",
    userRole: "USER",
  },
  {
    id: "18777",
    fname: "Vishnu",
    lname: "Jirge",
    email: "vishnujirge@example.com",
    contact: "9876543210",
    userRole: "ADMIN",
  },
];

// app.get("/api/users/:id", (req, res) => {
//   let id = req.params.id;

//   let userObj = users.find((u) => u.id === id);

//   if (userObj) {
//     return res.status(200).json(userObj);
//   } else {
//     return res.status(404).json({ message: "User not found" });
//   }
// });

app.get("/api/users/:id", (req, res) => {
  // :id colon means placeholder if you remove : then it is the string ... afte cansume .. have to send actual id .. we have to find that id obj

  // Get Users Id  from params
  // destructuring of obj {id} also works
  let id = req.params.id;
  // userObj get
  let userObj = users.find((u) => u.id === id);
  if (!userObj) {
    return res.status(404).json({
      success: false,
      error: {
        code: "USER_NOT_FOUND",
        message: `User with id ${id} not found`,
      },
    });
  }

  res.status(200).json(userObj);
});

// app.post("api/user", (req, res) => {
//   let obj = req.body;

//   if ((!obj, fname)) {
//     return res.status(400).json({
//       success: false,
//       error: {
//         code: "FIRST_NAME_REQUIRED",
//         // message: `User with id ${id} not found`,
//         message: `FIRST_NAME_IS_REQUIRED_FIELD`,
//       },
//     });
//   }
// });

app.use(express.json()); // add this above routes

app.post("/api/users", (req, res) => {
  const { fname, lname, email, contact, userRole } = req.body;

  // validation
  if (!fname) {
    return res.status(400).json({
      success: false,
      error: {
        code: "FIRST_NAME_REQUIRED",
        message: "FIRST_NAME_IS_REQUIRED_FIELD",
      },
    });
  }

  // create new user
  const newUser = {
    id: Date.now().toString(),
    fname,
    lname,
    email,
    contact,
    userRole,
  };

  users.push(newUser);

  return res.status(201).json({
    success: true,
    data: newUser,
  });
});
app.get("/api/users", (req, res) => {
  // let id = req.params.id
  res.status(200).json(users);
});

// we are listen that app on port 3000
app.listen(PORT, () => {
  cl(`application is runing on port ${PORT}`);
});
