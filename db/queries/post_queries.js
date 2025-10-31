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
    `SELECT posts.*, users.username, users.is_admin
    FROM posts
    JOIN users ON posts.user_id = users.user_id
    ORDER BY posts.timestamp DESC`,
  );
  return rows;
}

async function getPostCount() {
  const { rows } = await pool.query("SELECT COUNT(*) FROM posts");
  return rows[0].count;
}

async function deletePost(id) {
  await pool.query("DELETE FROM posts WHERE message_id = $1", [id]);
}

module.exports = {
  insertPost,
  getAllPosts,
  getPostCount,
  deletePost,
};
