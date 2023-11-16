import styled from 'styled-components';

export const Container = styled.div`
    padding: 20px;
`;

export const RegisterContainer = styled.div`
  padding: 20px;
  margin: auto;
  
  @media (min-width: 688px) {
    width: 598px;
  }

`;

export const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  padding: 10px;
  margin-left: auto;
  margin-right: auto;
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  width: 80%;
`;

export const Button = styled.button`
  background-color: #8A2BE2;
  color: #fff;
  margin-left: auto;
  margin-right: auto;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  width: 80%;
  margin-block-start: 1.5em;
  margin-block-end: 1.5em;
  
  &:hover{
    background: #6A1D9F;
    transition: ease-in-out 0.2s;
  }
`;

export const Error = styled.div`
  display: block;
  color: #fff;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #d32f2f;
  border-radius: 4px;
  background: #ff8a80;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  width: 80%;
`;

export const LoginLink = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
  text-align: center;
  width: 80%;
`;