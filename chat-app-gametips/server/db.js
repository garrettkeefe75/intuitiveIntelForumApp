const Pool = require("pg").Pool;

const pool = new Pool({
  user: "anyone",
  port: 5432,
  password: "teamgametips",
  host: "database-1.cgpwhtgqxogz.us-west-1.rds.amazonaws.com",
  database: "teamgametipsdb",
});

module.exports = pool;
