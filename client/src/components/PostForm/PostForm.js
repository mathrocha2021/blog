import React, { useState, useContext, useRef } from 'react';
import api from '../../config/configApi';

import { AuthContext } from "../../context/AuthContext";

import { Form, Label, Input, TextArea, Button, InputContainer, Error } from './PostForm.styles'; // Importe os componentes estilizados

function PostForm({ posts, setPosts }) {
  const {loggedUser} = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  
  const handlePostAdded = (newPost) => {
    // Atualizar a lista de usuários com o novo usuário
    setPosts([...posts, newPost]);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    //Verifica se o usuário está autenticado
    if(!loggedUser) {
      alert("Você precisa estar logado");
      return;
    }

    // Verifique se os campos 'title' e 'content' estão preenchidos
    if (!title) {
      setError('O campo "Título" é obrigatório.');
      return;
    }

    if (!content) {
      setError('O campo "Conteúdo" é obrigatório.');
      return;
    }
    
    // Cria uma nova instância de FormData para preparar dados de formulário.
    // Adiciona os campos 'title', 'content', 'loggedUser' e 'image' ao FormData,
    // utilizando as variáveis correspondentes como valores.
    const formdata = new FormData();
    formdata.append('title',title);
    formdata.append('content',content);
    formdata.append('loggedUser',loggedUser);
    formdata.append('image',image);

    // Fazer uma solicitação POST para adicionar o novo post
    api
    .post('/posts',
      formdata
    )
    .then((response) => {
      // Chamar a função de retorno para atualizar a lista de posts
      handlePostAdded(response.data.post);
      // Limpar os campos do formulário
      setTitle('');
      setContent('');
      setImage(null);
      fileInputRef.current.value = '';
      setError(null); // Limpar mensagens de erro anteriores
    })
    .catch((error) => {
      console.error(error)
      setError('Erro ao adicionar publicação. Verifique os campos e tente novamente.');
    });
  };

  return (
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <InputContainer>
          <Label>Título:</Label>
          <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </InputContainer>
        <InputContainer>
          <Label>Conteúdo:</Label>
          <TextArea value={content} rows="4" onChange={(e) => setContent(e.target.value)}></TextArea>
        </InputContainer>
        <InputContainer>
          <Label>Imagem:</Label>
          <Input type="file" name="image" ref={fileInputRef} onChange={(e) => setImage(e.target.files[0])} />
        </InputContainer>
        <Button type="submit">Postar</Button>
        {error && <Error>{error}</Error>}
      </Form>
  );
}

export default PostForm;
