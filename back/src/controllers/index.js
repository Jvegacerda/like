let Posts = require('../models/Posts')

const handleCreatePost = async (req, res) => {

    const { titulo, img, descripcion } = req.body
    const response = await Posts.crear(titulo, img, descripcion)

    const posts = await Posts.ver();

    res.status(200).json({
        msg: "Post creado con éxito!",
        data: posts.data
    })
}

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

module.exports = {
    handleCreatePost,
    handleGetPosts
}