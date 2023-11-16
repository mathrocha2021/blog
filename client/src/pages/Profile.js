import React, { useState } from 'react';
import PostList from '../components/PostList/PostList';
import NavBar from '../components/Navbar/Navbar';

function Profile() {
  const [posts, setPosts] = useState([]);

  return (
    <>
      <NavBar />
      <PostList posts={posts} setPosts={setPosts} />
    </>
  );
}

export default Profile;