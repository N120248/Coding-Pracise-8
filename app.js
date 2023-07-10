const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
app.use(express.json());
const dbPath = path.join(__dirname, "todoApplication.db");
let db = null;
const initializingDb = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3030, () => {
      console.log("Server Starts at http://localhost:3030");
    });
  } catch (e) {
    console.log(`DB ERROR ${e.message}`);
    process.exit(1);
  }
};

initializingDb();

app.get("/todos/", async (request, response) => {
  const { status } = request.query;
  const fetchingQuery = `select * from todo where status='${status}';`;
  const result = await db.all(fetchingQuery);
  response.send(result);
});

module.exports = app;
