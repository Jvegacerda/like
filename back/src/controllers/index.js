let Posts = require('../models/Posts')
const { DB } = require('../config/db');

const handleCreatePost = async (req, res) => {
    const { titulo, img, descripcion } = req.body;

    try {
        const response = await Posts.crear(titulo, img, descripcion);
        const posts = await Posts.ver();

        res.status(200).json({
            msg: "Post creado con éxito!",
            data: posts.data,
        });
    } catch (error) {
        console.error("Error al crear el post:", error);

        res.status(500).json({
            msg: "Error al crear el post",
            error: error.message,
        });
    }
};
 
const handleGetPosts = async (req, res) => {
    try {
        const response = await Posts.ver(); 
        console.log(response); 
        res.status(200).json({
            msg: "Lista de Posts",
            data: response.data || response  
        });
    } catch (error) {
        console.error("Error al obtener los posts:", error);
        res.status(500).json({ message: "Error al obtener los posts" });
    }
};

const handleGetLikes = async (req, res) => {
    const { id } = req.params; 
    try {
        const consulta = `UPDATE posts SET likes = COALESCE(likes, 0) + 1 WHERE id = $1 RETURNING *`;
        const values = [id]; 
        const result = await pool.query(consulta, values);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Post no encontrado" });
        }
        res.status(200).json({ 
            message: "Like actualizado", 
            data: result.rows[0] 
        });
    } catch (error) {
        console.error("Error al actualizar el post:", error);
        res.status(500).json({ message: "Error al actualizar el post" });
    }
};

const handleDeletePost = async (req, res) => {
    const { id } = req.params; 
    try {
        const consulta = `DELETE FROM posts WHERE id = $1 RETURNING *`;
        const values = [id]; 
        const result = await DB.query(consulta, values); 

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Post no encontrado" });
        }

        res.status(200).json({ 
            message: "Post eliminado", 
            data: result.rows[0] 
        });
    } catch (error) {
        console.error("Error al eliminar el post:", error);
        res.status(500).json({ message: "Error al eliminar el post" });
    }
};

module.exports = {
    handleCreatePost,
    handleGetPosts,
    handleGetLikes,
    handleDeletePost
}