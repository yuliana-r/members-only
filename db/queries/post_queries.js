const pool = require("../pool");

async function insertPost(title, message, user_id) {
  await pool.query(
    `INSERT INTO posts (title, text, user_id)
    VALUES ($1, $2, $3)`,
    [title, message, user_id],
  );
}

async function getAllPosts() {
  const { rows } = await pool.query(
    "SELECT * FROM posts ORDER BY timestamp DESC",
  );
  return rows;
}

async function getPostById() {}

async function deletePost() {}

module.exports = {
  insertPost,
  getAllPosts,
};
