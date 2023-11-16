import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../config/configApi';
import _ from 'lodash';
import {List, ListItem, ButtonContainer, EditButton, DeleteButton, Title, AuthorContainer, AuthorPicture, AuthorProfile, Image } from './PostList.styles';
import { AuthContext } from "../../context/AuthContext";
import EditModal from '../EditModal/EditModal';

function PostList({posts, setPosts}) {
  const [user, setUser] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const {loggedUser} = useContext(AuthContext);
  const {userId} = useParams();

  useEffect(() => {
    if(userId){
      // Faz uma solicitação GET para listar apenas os posts de um usuário
      api.get(`/users/${userId}`)
      .then((response) => {
        const sortedPosts = _.orderBy(response.data.posts, ['createdAt'], ['desc']);
        setPosts(sortedPosts);
        setUser(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar posts do usuário:', error);
      });  
    } else {
      // Fazer uma solicitação GET para listar todos os posts de todos usuários
      api.get('/posts')
      .then((response) => {
        const sortedPosts = _.orderBy(response.data, ['createdAt'], ['desc']);
        setPosts(sortedPosts);
      })
      .catch((error) => {
        console.error('Erro ao buscar usuários:', error);
      });          
    }
  }, [posts]);
  
  const handleEditClick = (postToEdit) => {
    // Define o post a ser editado
    setEditingPost(postToEdit);
  };
  
  const handlePostDelete = (postToDelete) => {
    // Fazer uma solicitação DELETE para excluir o post no servidor
    api.delete(`/posts/${postToDelete._id}`)
      .then(() => {
        // Atualizar a lista de posts removendo o post excluído
        setPosts(posts.filter(post => post._id !== postToDelete._id));
      })
      .catch((error) => {
        console.error('Erro ao excluir publicação:', error);
      });
  };

  return (
    <>
      {userId ?
      <>
        <div></div>
        <List>
          {posts.map((post) => (
            <ListItem key={post._id}>
              <AuthorContainer>
                <AuthorPicture src={`/images/profilePictures/${user.profilePicture}`} />
                <AuthorProfile href={user._id}>{user.username}</AuthorProfile>
              </AuthorContainer>
              <ButtonContainer>              
                {post.author === loggedUser && (
                  <EditButton onClick={() => handleEditClick(post)}>Editar</EditButton>
                )}
                {post.author === loggedUser && (
                  <DeleteButton onClick={() => handlePostDelete(post)}>Excluir</DeleteButton>
                )}
              </ButtonContainer>
              <Title>{post.title}</Title>
              <p>{post.content}</p> 
              {post.imageName && <Image src={`/images/postImages/${post.imageName}`} />}
            </ListItem>
          ))}
        </List>
      </> :
        <List>
          {posts.map((post) => (
            <ListItem key={post._id}>
              <AuthorContainer>
                <AuthorPicture src={`/images/profilePictures/${post.author.profilePicture}`} />
                <AuthorProfile href={post.author._id}>{post.author.username}</AuthorProfile>
              </AuthorContainer>
              <ButtonContainer>
                {post.author._id === loggedUser && (
                  <EditButton onClick={() => handleEditClick(post)}>Editar</EditButton>
                )}
                {post.author._id === loggedUser && (
                  <DeleteButton onClick={() => handlePostDelete(post)}>Excluir</DeleteButton>
                )}
              </ButtonContainer>
              <Title>{post.title}</Title>
              <p>{post.content}</p> 
              {post.imageName && <Image src={`/images/postImages/${post.imageName}`} />}
            </ListItem>
          ))}
        </List>    
      }

      {editingPost && (
        <EditModal 
          posts={posts}
          setPosts={setPosts}
          editingPost={editingPost}
          setEditingPost={setEditingPost} 
        />
      )}

    </>
  );
}

export default PostList;