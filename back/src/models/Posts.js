const { DB } = require('../config/db')

const crear = async (titulo, img, descripcion) => {

    const SQLQuery = "INSERT INTO posts values (DEFAULT, $1, $2, $3) RETURNING *"
    const SQLValues = [titulo, img, descripcion]

    const { rowCount, rows } = await DB.query(SQLQuery, SQLValues)

    return {
        rowCount,
        data:rows
    }}

const ver = async () => {

    const SQLQuery = "SELECT * FROM posts";
    const { rowCount, rows } = await DB.query(SQLQuery);

    return {
        rowCount,
        data:rows
    }}


const modificar = async (id, titulo, img, descripcion) => {
    const SQLQuery = "UPDATE posts SET titulo = $1, img = $2, descripcion = $3 WHERE id = $4 RETURNING *"
    const SQLValues = [titulo, img, descripcion, id]

    const { rowCount, rows } = await DB.query(SQLQuery, SQLValues)

    return {
        rowCount,
        data:rows
    }}

module.exports = { crear, ver , modificar};