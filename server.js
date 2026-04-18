require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ================= AUTH =================
const TOKEN = process.env.API_TOKEN || "mysecrettoken";

function authMiddleware(req, res, next) {
  const token = req.headers.authorization;

  if (!token || token !== TOKEN) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  next();
}

// ================= GENERIC CRUD =================
function createCRUDRoutes(path, dataArray) {
  // GET ALL
  app.get(`/api/${path}`, (req, res) => {
    res.json({ success: true, data: dataArray });
  });

  // GET BY ID
  app.get(`/api/${path}/:id`, (req, res) => {
    const item = dataArray.find(i => i.id === req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: `${path} not found`,
      });
    }

    res.json({ success: true, data: item });
  });

  // CREATE
  app.post(`/api/${path}`, authMiddleware, (req, res) => {
    const newItem = {
      id: Date.now().toString(),
      ...req.body,
    };

    dataArray.push(newItem);

    res.status(201).json({ success: true, data: newItem });
  });

  // UPDATE
  app.put(`/api/${path}/:id`, authMiddleware, (req, res) => {
    const index = dataArray.findIndex(i => i.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: `${path} not found`,
      });
    }

    dataArray[index] = { ...dataArray[index], ...req.body };

    res.json({ success: true, data: dataArray[index] });
  });

  // DELETE
  app.delete(`/api/${path}/:id`, authMiddleware, (req, res) => {
    const index = dataArray.findIndex(i => i.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: `${path} not found`,
      });
    }

    const deleted = dataArray.splice(index, 1);

    res.json({
      success: true,
      message: `${path} deleted`,
      data: deleted[0],
    });
  });
}

// ================= DATA (SAME VISHNU  EVERYWHERE) =================

// USERS
let users = [
  {
    id: "123",
    fname: "Vishnu",
    lname: "Jirge",
    email: "vishnujirge@example.com",
    contact: "9876543210",
    userRole: "ADMIN",
  }
];

// TODOS
let todos = [
  {
    id: "123",
    title: "Learn Angular",
    completed: false,
    user: "Vishnu",
  }
];

// POSTS
let posts = [
  {
    id: "123",
    title: "My First Post",
    content: "Hello from Vishnu",
    author: "Vishnu",
  }
];

// MOVIES
let movies = [
  {
    id: "123",
    title: "KGF",
    rating: 9,
    actor: "Vishnu",
  }

];

// STUDENTS
let students = [
  {
    id: "123",
    name: "Vishnu",
    age: 25 ,
    course: "Angular Dev",
  }
];

// ================= APPLY GENERIC =================
createCRUDRoutes("users", users);
createCRUDRoutes("todos", todos);
createCRUDRoutes("posts", posts);
createCRUDRoutes("movies", movies);
createCRUDRoutes("students", students);

// ================= ROOT =================
app.get("/", (req, res) => {
  res.send("Generic CRUD API Running 🚀");
});

// ================= SERVER =================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});