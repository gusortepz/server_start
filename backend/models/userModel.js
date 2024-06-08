const { db } = require("../config/db");

const getAllUsers = async () => {
  const query = "SELECT * FROM users ORDER BY id ASC;";
  const { rows } = await db.query(query);
  return rows;
};

const getUserById = async (id) => {
  try {
    const query = "SELECT * FROM users WHERE id = $1;";
    const { rows } = await db.query(query, [id]);
    return rows[0];
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (user) => {
  try {
    const query = "INSERT INTO users (name,email,lastname,borncity,interests,profession) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *;";
    const { rows } = await db.query(query, [user.name, user.email, user.lastname, user.borncity, user.interests, user.profession]);
    return rows[0];
  } catch (error) {
    throw new Error(error);
  }
};

const updateUser = async (id, user) => {
  try {
    const query =
      "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *;";
    const { rows } = await db.query(query, [user.name, user.email, user.lastname, user.borncity, id]);
    return rows[0];
  } catch (error) {
    console.log(error);
  }
};
module.exports = { getAllUsers, getUserById, createUser, updateUser };