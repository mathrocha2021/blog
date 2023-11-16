import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Form = styled.form`
  box-sizing: border-box;
  padding: 15px 20px;
  margin-left: auto;
  margin-right: auto;
  border-bottom: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
  border-left: 1px solid #e0e0e0;

  @media (min-width: 688px) {
    width: 598px;
  }
`;

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Label = styled.label`
  display: block;
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
  text-align: left;
  width: 80%;
`;

export const Input = styled.input`
  display: block;
  padding: 10px;
  border: 1px solid #ccc;
  width: 80%;
`;

export const TextArea = styled.textarea`
  display: block;
  padding: 10px;
  border: 1px solid #ccc;
  width: 80%;
`;

export const Button = styled.button`
  display: block;
  background-color: #8A2BE2;
  color: #fff;
  border: none;
  border-radius: 9999px;
  margin-left: auto;
  margin-right: auto;
  padding: 15px 0px;
  cursor: pointer;
  margin-block-start: 1.5em;
  margin-block-end: 1.5em;
  width: 40%;
  font-weight: bold;

  &:hover{
    background: #6A1D9F;
    transition: ease-in-out 0.2s;
  }
`;

export const Error = styled.div`
  display: block;
  color: #fff;
  padding: 10px;
  border: 1px solid #d32f2f;
  border-radius: 4px;
  background: #ff8a80;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  width: 80%;
`;
