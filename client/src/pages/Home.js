import React, { useState } from 'react';
import PostForm from '../components/PostForm/PostForm';
import PostList from '../components/PostList/PostList';
import NavBar from '../components/Navbar/Navbar';

function Home() {
  const [posts, setPosts] = useState([]);

  return (
    <>
      <NavBar />      
      <PostForm posts={posts} setPosts={setPosts} />
      <PostList posts={posts} setPosts={setPosts} />
    </>
  );
}

export default Home;