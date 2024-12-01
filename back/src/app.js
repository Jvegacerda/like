const express = require('express')
const path = require('path');
const APIRoutes = require('./routes/routes')
const cors = require('cors')


const app = express()



app.use(cors());
app.use(express.json())
app.put('/posts/like/:id', async (req, res) => {
    const { id } = req.params;
    const { likes } = req.body;
    console.log("Likes received:", likes);
  
    if (isNaN(likes) || likes < 0) {
      return res.status(400).json({ message: "Invalid likes value" });}
  
    try {const result = await DB.query(
        'UPDATE posts SET likes = $1 WHERE id = $2 RETURNING *',
        [likes, id]);
  
      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
      } else {res.status(404).json({ message: "Post not found" });}
    } catch (error) {
      console.error("Error updating likes:", error);
      res.status(500).json({ message: "Error updating likes" });
    }});
        
// Rutas
app.use('/api', APIRoutes);
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../../front/index.html"));
  });
  
module.exports = app