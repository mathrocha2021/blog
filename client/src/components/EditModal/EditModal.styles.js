import styled from 'styled-components';

export const EditModalWrapper = styled.div`
  /* Camada de fundo */
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  z-index: 1000;

  /* Estilos do modal */
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const EditModalContainer = styled.div`
  margin-right: auto;
  margin-left: auto;
  background: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 16px;
  position: relative;
  z-index: 1;
  width: 80%;

  @media (min-width: 688px) {
    width: 598px;
  }
  
`;

export const ModalTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 16px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  margin-bottom: 8px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

export const Textarea = styled.textarea`
  margin-bottom: 8px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

export const SaveButton = styled.button`
  background: #8A2BE2;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background: #6A1D9F;
    transition: ease-in-out 0.2s;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 10px;
  top: 15px;
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