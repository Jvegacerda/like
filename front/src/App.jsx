import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from './components/Form';
import Post from './components/Post';

const urlBaseServer = "http://localhost:3000";

function App() {
  const [titulo, setTitulo] = useState("");
  const [imgSrc, setImgSRC] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const response = await axios.get('http://localhost:3000/api/posts');
    setPosts(response.data.data);  
  };
  

  const agregarPost = async () => {
    const post = { titulo, img: imgSrc, descripcion, likes: 0 };
    const response = await axios.post(urlBaseServer + "/api/posts", post);
    getPosts(); 
  };
  
  const like = async (id) => {
    console.log("ID recibido en like:", id); 
  
    if (!id) {
      console.error("El ID no es válido");
      return;
    }
  
    try {
      await axios.put(`${urlBaseServer}/posts/like/${id}`);
      getPosts();  
    } catch (error) {
      console.error("Error al actualizar el like:", error);
    }
  };

  // este método se utilizará en el siguiente desafío
  const eliminarPost = async (id) => {
    await axios.delete(urlBaseServer + `/posts/${id}`);
    getPosts();
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="App">
      <h2 className="py-5 text-center">&#128248; Like Me &#128248;</h2>
      <div className="row m-auto px-5">
        <div className="col-12 col-sm-4">
          <Form
            setTitulo={setTitulo}
            setImgSRC={setImgSRC}
            setDescripcion={setDescripcion}
            agregarPost={agregarPost}
          />
        </div>
        <div className="col-12 col-sm-8 px-5 row posts align-items-start">
          {posts.map((post, i) => (
            <Post
              key={i}
              post={post}
              like={like}
              eliminarPost={eliminarPost}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
