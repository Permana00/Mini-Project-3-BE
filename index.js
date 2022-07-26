require("dotenv").config();
const cors = require("cors");
const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const db = require("./helper/relation");
const app = express();
const user = require("./routes/user");
const note = require("./routes/note");
const groupnotes = require("./routes/groupnotes");
const group = require("./routes/group");

const { User, Notes, Group } = db;

app.use(express.json());
app.use(cors());
app.use(user);
app.use(note);
app.use(groupnotes);
app.use(group);

app.listen(process.env.PORT, () =>
  console.log("Listening at port: " + process.env.PORT)
);
