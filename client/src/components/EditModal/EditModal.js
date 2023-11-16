import React, { useEffect, useState } from 'react';
import api from '../../config/configApi';
import { EditModalWrapper, EditModalContainer, ModalTitle, Form, Input, Textarea, SaveButton, CloseButton } from './EditModal.styles';

function EditModal({posts, setPosts, editingPost, setEditingPost}) {

    const [editedTitle, setEditedTitle] = useState('');
    const [editedContent, setEditedContent] = useState('');

    useEffect (() => {
        setEditedTitle(editingPost.title);
        setEditedContent(editingPost.content);
    }, []);

    const handleUpdatePost = (e) => {
        e.preventDefault();
        // Verifique se há dados de edição válidos (título e conteúdo não estão vazios)
        if (!editedTitle || !editedContent) {
          alert('Por favor, preencha o título e o conteúdo antes de atualizar.');
          return;
        }
        
        // Crie um objeto com os dados atualizados do post
        const updatedPost = {
          title: editedTitle,
          content: editedContent,
        };
    
        // Faça uma solicitação PUT para atualizar o post no servidor
        api
        .put(`/posts/${editingPost._id}`, updatedPost)
        .then((response) => {
          // Atualize o estado dos posts na UI com o post atualizado
          const updatedPosts = posts.map((post) => {
              if (post._id === editingPost._id) {
                return response.data.post;
              }
              return post;
            });
            
            setPosts(updatedPosts);
       
            setEditingPost(null); // Limpe o estado de edição
            setEditedTitle(''); // Limpe o título editado
            setEditedContent('');
          })
          .catch((error) => {
            console.error('Erro ao atualizar o post:', error);
          });
      };
    
      const handleCloseModal = () => {
        setEditingPost(null);
        setEditedTitle('');
        setEditedContent('');
      };

    return (
        <EditModalWrapper>
          <EditModalContainer>
            <ModalTitle>Editar Post</ModalTitle>
            <Form>
              <Input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              <Textarea
                value={editedContent}
                rows="6"
                onChange={(e) => setEditedContent(e.target.value)}
              />
              <SaveButton onClick={handleUpdatePost}>Salvar</SaveButton>
              <CloseButton onClick={handleCloseModal}>Fechar</CloseButton>
            </Form>
          </EditModalContainer>
        </EditModalWrapper>
    );
}

export default EditModal;