const express = require("express");

const app = express();
const port = 3000;


app.get("/", (req, res) => { 
    res.json({info: "Hello World! from Node.js, Express, and PostgreSQL!"});
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
