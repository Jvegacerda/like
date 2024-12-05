const { Router } = require('express')
const { handleCreatePost, handleGetPosts, handleGetLikes, handleDeletePost } = require('../controllers/index')

const router = Router()

router.put("/posts/like/:id", handleGetLikes);
router.delete("/posts/:id", handleDeletePost);
router.post("/posts", handleCreatePost)
router.get("/posts", handleGetPosts)



module.exports = router;