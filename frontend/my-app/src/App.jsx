import './App.css'
import React, {useEffect, useState} from 'react';
import Posts from './components/Posts.jsx';
import {Route, Routes} from 'react-router-dom';
import Post from './components/Post.jsx';
import NewPost from './components/NewPost.jsx';

function App() {
  const [posts, setPosts] = useState([])
  const [updatingFlag, setUpdatingFlag] = useState(1)

  async function getPostsData() {
    let response = await fetch('http://localhost:7071/posts')
    response = await response.json();
    setUpdatingFlag(0)
    setPosts(response)
  }

  useEffect(() => {
    updatingFlag && getPostsData()
  }, [updatingFlag])

  return (
    <Routes>
      <Route path="/" element={<Posts posts={posts} />} />
      <Route path="/posts/:id" element={<Post mode="single" setUpdatingFlag={setUpdatingFlag} />} />
      <Route path="/posts/new" element={<NewPost setUpdatingFlag={setUpdatingFlag} />} />
    </Routes>
  )
}

export default App