const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//Routes

//Create a thread

app.get("/getUser/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const user = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    res.json(user.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/checkUserName/:user", async (req, res) => {
  try {
    const { userName } = req.params;
    const possibleUser = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [userName]
    );
    res.json(possibleUser.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.post("/newUser", async (req, res) => {
  try {
    const { email, name } = req.body;
    const newUser = await pool.query(
      "INSERT INTO users (username, email) VALUES($1, $2) RETURNING *",
      [name, email]
    );
    res.json(newUser.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.post("/threads", async (req, res) => {
  try {
    const { gameName, description } = req.body;
    const newThread = await pool.query(
      "INSERT INTO thread (description, game_name) VALUES($1, $2) RETURNING *",
      [description, gameName]
    );

    res.json(newThread.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//get all threads

app.get("/threads", async (req, res) => {
  try {
    const allThreads = await pool.query("SELECT * FROM thread");
    res.json(allThreads.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//queries database for the thread contents of a given thread. returns all rows.

app.get("/threads/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const oneThread = await pool.query(
      "SELECT (thread_contents.content_id, thread_contents.user_id, users.username, thread_contents.contents) \
       FROM thread_contents LEFT JOIN users ON thread_contents.user_id = users.user_id \
       WHERE thread_contents.thread_id = $1",
      [id]
    );
    res.json(oneThread.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//update thread

app.put("/threads/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateThread = await pool.query(
      "UPDATE thread SET description = $1 WHERE thread_id = $2",
      [description, id]
    );
    res.json("Thread is updated");
  } catch (error) {
    console.error(error.message);
  }
});

//delete a thread
//Add on more details if needed to upadtre on the thread
app.delete("/threads/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteThread = await pool.query(
      "DELETE FROM thread WHERE thread_id = $1",
      [id]
    );
    res.json("Thread is deleted");
  } catch (error) {
    console.error(error.message);
  }
});

// app.get("/", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const oneThread = await pool.query(
//       "SELECT * FROM thread WHERE thread_id = $1",
//       [id]
//     );
//     res.json(oneThread.rows[0]);
//   } catch (error) {
//     console.error(error.message);
//   }
// });

app.listen(5000, () => {
  console.log("started on port 5000");
});
