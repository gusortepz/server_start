const { db } = require('../config/db');

const getDescriptionById = async (id) => {
    try {
        const query = 'SELECT U.name, d.description, d.prescription, d.context, d.pdfurl FROM users U JOIN description d ON U.id = d.userd_id WHERE U.id = $1;';
        const { rows } = await db.query(query, [id]);
        return rows;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

const createDescription = async(description, prescription, context, pdfurl, userId) => {
    try {
        const query = "INSERT INTO description (description, prescription, context, pdfurl, userd_id) VALUES ($1, $2, $3, $4, $5) RETURNING *;";
        const { rows } = await db.query(query, [description, prescription, context, pdfurl, userId]);
        return rows[0];
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

module.exports = { getDescriptionById, createDescription };