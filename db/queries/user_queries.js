const pool = require("../pool");

async function getUsername(username) {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  console.log(rows[0]);
  return rows[0];
}

async function insertUser(
  first_name,
  last_name,
  username,
  password,
  isMember,
  isAdmin,
) {
  await pool.query(
    `INSERT INTO users (first_name, last_name, username, password, isMember, isAdmin)
    VALUES ($1, $2, $3, $4, $5, $6)`,
    [first_name, last_name, username, password, isMember, isAdmin],
  );
}
module.exports = {
  getUsername,
  insertUser,
};
