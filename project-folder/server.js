import express from "express";

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static("./public"));

let userData = [];

app.post("/submit", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Password and email are required");
  }

  userData.push({ email, password });
  console.log("Current User Data:", userData);

  res.status(201).send("Login data received");
});

app.get("/users", (req, res) => {
  res.json(userData);
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
