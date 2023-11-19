import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 0.5rem;
  padding-right: 0.5rem;

`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin-left: auto;
  margin-right: auto;
  margin-block-start: 0px;

  @media (min-width: 688px) {
    width: 598px;
  }
`;

export const ListItem = styled.li`
position: relative;
  border-bottom: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
  border-left: 1px solid #e0e0e0;
  padding: 15px 16px;

  &:hover {
    background-color: rgb(247, 249, 249);
    transition: ease-in-out 0.1s;
  }

`;

export const AuthorContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const AuthorPicture = styled.img`
  width: 50px; /* Defina o tamanho desejado para a imagem */
  height: 50px; /* Defina o tamanho desejado para a imagem */
  border-radius: 50%; /* Isso transformará a imagem em um círculo */
  object-fit: cover;
`;

export const AuthorProfile = styled.a`
  font-weight: bold;
  text-decoration: none;
`;
  
export const Title = styled.p`
  display: block;
  font-weight: bold;
`;

export const Image = styled.img`
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  width: 100%;
  
  @media (min-width: 688px) {
    width: 512px;
  }

`;

export const ButtonContainer = styled.div`
  position: absolute;
  display: flex;
  right: 10px;
  top: 15px;
  gap: 10px;
`;

export const EditButton = styled.button`

  background-color: #8A2BE2;
  color: #fff;
  border: none;
  border-radius: 9999px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover{
    background: #6A1D9F;
    transition: ease-in-out 0.2s;
  }

`;

export const DeleteButton = styled.button`
  background-color: #ff3333;
  color: #fff;
  border: none;
  border-radius: 9999px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: #CC0000;
    transition: ease-in-out 0.2s;
  }
`;