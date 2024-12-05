const express = require('express')
const path = require('path');
const APIRoutes = require('./routes/routes')
const { DB } = require('./config/db');
const cors = require('cors')



const app = express()



app.use(cors());
app.use(express.json())

app.put('/posts/like/:id', async (req, res) => {
  const { id } = req.params;

  try {const result = await DB.query(
          'UPDATE posts SET likes = COALESCE(likes, 0) + 1 WHERE id = $1 RETURNING *', [id]);
      res.status(200).json(result.rows[0]);
  } catch (error) {
      console.error("Error updating likes:", error);
      res.status(500).json({ message: "Error updating likes" }); 
  }});

  app.delete('/posts/:id', async (req, res) => {
    const { id } = req.params; 
    console.log("ID recibido en el backend para eliminar:", id); 
  
    try {
      const result = await DB.query(
        'DELETE FROM posts WHERE id = $1 RETURNING *', [id]
      );
  
      if (result.rowCount > 0) {
        res.status(200).json({ message: "Post eliminado", post: result.rows[0] });
      } else {
        res.status(404).json({ message: "Post no encontrado" });
      }
    } catch (error) {
      console.error("Error al eliminar el post:", error);
      res.status(500).json({ message: "Error al eliminar el post" });
    }
  });
  

        
// Rutas
app.use('/api', APIRoutes);
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../../front/index.html"));
  });
  
module.exports = app