const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 8000; //env var

const { getExperiences } = require("./services/notion");
const { getProjects } = require("./services/notion");

const app = express();

app.use(cors());

app.get("/experiences", async (req, res) => {
  const experiences = await getExperiences();
  res.json(experiences);
});
app.get("/projects", async (req, res) => {
  const projects = await getProjects();
  res.json(projects);
});

app.listen(PORT, console.log(`Server started on ${PORT}`));
