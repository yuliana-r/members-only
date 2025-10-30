const pool = require("../pool");

async function getUserByUsername(username) {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return rows[0];
}

async function getUserById(id) {
  const { rows } = await pool.query("SELECT * FROM users WHERE user_id = $1", [
    id,
  ]);
  return rows[0];
}

async function insertUser(
  first_name,
  last_name,
  username,
  password,
  is_member,
  is_admin,
) {
  await pool.query(
    `INSERT INTO users (first_name, last_name, username, password, is_member, is_admin)
    VALUES ($1, $2, $3, $4, $5, $6)`,
    [first_name, last_name, username, password, is_member, is_admin],
  );
}

async function updateUserMembership(user_id, is_member) {
  await pool.query(`UPDATE users SET is_member = $1 WHERE user_id = $2`, [
    is_member,
    user_id,
  ]);
}

module.exports = {
  getUserByUsername,
  insertUser,
  getUserById,
  updateUserMembership,
};
