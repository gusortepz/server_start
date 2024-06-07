const { db } = require('../config/db');

const getFeedbackById = async (id) => {
    try {
        const query = 'SELECT U.name, d.feedback FROM users U JOIN feedback d ON U.id = d.userd_id WHERE U.id = $1;';
        const { rows } = await db.query(query, [id]);
        return rows;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

const createFeedback = async(feedback, userId) => {
    try {
        const query = "INSERT INTO feedback (feedback, userd_id) VALUES ($1, $2) RETURNING *;";
        const { rows } = await db.query(query, [feedback, userId]);
        return rows[0];
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

module.exports = { getFeedbackById, createFeedback };