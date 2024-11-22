const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const expressListEndpoints = require("express-list-endpoints");


const randomConspiracyTheories = require("./data/random-conspiracy-theories.json");


const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-first-api"
mongoose.connect(mongoUrl)
mongoose.Promise = Promise


const Theorie = mongoose.model("Theorie", {
  theoryID: Number,
  title: String,
  orgin_year: Number,
  keyFigures: [String],
  evidence_rating: Number,
  description: String,
  notableQuotes: [String],

})

if (process.env.RESET_DATABASE) {
  const seedDatabase = async () => {
    await Theorie.deleteMany()

    randomConspiracyTheories.forEach((theorieData) => {
      new Theorie(theorieData).save()
    })
  }
  seedDatabase()
}

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
res.send(`
  <html>
    <head>
      <title>Random Conspiracy Theories</title>
    </head>
    <body>
      <h1>Welcome to the Random Conspiracy Theories API</h1>
      <p>Use the following endpoints to explore the theories:</p>
      <ul>
        <li><a href="/conspiracy-theories">/conspiracy-theories</a> - Get all conspiracy theories</li>
        <li><a href="/conspiracy-theories/names">/conspiracy-theories/names</a> - Get the titles of all conspiracy theories</li>
        <li><a href="/conspiracy-theories/theorie/:id">/conspiracy-theories/theorie/:id</a> - Get a specific conspiracy theory by ID, nr. 1-10</li>
        ${[...Array(10).keys()].map(i => `
          <li>
            <button onclick="window.location.href='/conspiracy-theories/theorie/${i + 1}'">Theory ${i + 1}, ${randomConspiracyTheories[i].title}</button>
          </li>
        `).join('')}
        </ul>
    </body>
  </html>
`);
})

app.get("/conspiracy-theories", (req, res) => {
  res.json(randomConspiracyTheories)
})

app.get("/conspiracy-theories/names", (req, res) => {
  const titles = randomConspiracyTheories.map(theory => theory.title);
  res.json(titles);
})

app.get("/conspiracy-theories/theorie/:id", (req, res) => {
  const id = req.params.id;
  const theory = randomConspiracyTheories.find((item) => item.theoryID === +id);

  if (theory) {
    res.json(theory);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

const endpoints = expressListEndpoints(app);
console.log(endpoints); 

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
