const Pool = require("pg").Pool;

const pool = new Pool({
  user: "nandu",
  port: 4000,
  host: "localhost",
  database: "forumapp",
});

module.exports = pool;
