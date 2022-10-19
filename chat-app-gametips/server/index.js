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
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
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
    const { email, name, imgurl } = req.body;
    const newUser = await pool.query(
      "INSERT INTO users (username, email, imgurl) VALUES($1, $2, $3) RETURNING *",
      [name, email, imgurl]
    );
    const newGamer = await pool.query(
      "INSERT INTO gamers (name, userid) VALUES ($1, $2) RETURNING *",
      [name, newUser.rows[0].user_id]
    );
    res.json(newUser.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// get a users previous tips

app.get("/tips/:user_id", async (req, res) => {
  try {
    const {user_id} = req.params;
    userTips = await pool.query(
      "SELECT * FROM tips WHERE creator = $1", 
      [user_id]
    );
    res.json(userTips.rows);
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
      "SELECT thread_contents.content_id, thread_contents.user_id, users.username, thread_contents.contents, \
       users.imgurl, thread_contents.unix_time, thread_contents.like_dislike_ratio \
       FROM thread_contents LEFT JOIN users ON thread_contents.user_id = users.user_id \
       WHERE thread_contents.thread_id = $1 \
       ORDER BY thread_contents.unix_time ASC",
      [id]
    );
    res.json(oneThread.rows);
    // oneThread.rows.map((thread) => {
    //   console.log(thread);
    // });
  } catch (error) {
    console.error(error.message);
  }
});

// posts a comment to a thread

app.post("/threads/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const {user_id, contents} = req.body;
    const curr_time = Date.now();
    const insertComment = await pool.query("INSERT INTO thread_contents(thread_id, user_id, contents, unix_time) \
     VALUES($1, $2, $3, $4) RETURNING *",
  [id, user_id, contents, curr_time]);
    res.json(insertComment.rows[0]);
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

//

app.put("/threads/:thread_id/:content_id/changeLikeRatio", async (req, res) => {
  try {
    const {thread_id, content_id} = req.params;
    const {amountToChange} = req.body;
    const likeComment = await pool.query(
      "UPDATE thread_contents SET like_dislike_ratio = like_dislike_ratio + $1 WHERE content_id = $2",
      [amountToChange, content_id]
    );
    res.json("Comment liked!");
  } catch (error) {
    console.error(error.message);
  }
});

// delete a comment from a thread

app.delete("/threads/:thread_id/:content_id", async (req, res) => {
  try {
    const {thread_id, content_id} = req.params;
    const deleteComment = await pool.query(
      "DELETE FROM thread_contents WHERE content_id = $1",
      [content_id]
    );
    res.json("Comment deleted!");
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
    const deleteThreadContents = await pool.query(
      "DELETE FROM thread_contents WHERE thread_id = $1",
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
