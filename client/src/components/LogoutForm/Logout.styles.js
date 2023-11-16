import styled from 'styled-components';

export const LogoutContainer = styled.div`
  text-align: center;
  padding: 20px;
  max-width: 300px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const LogoutButton = styled.button`
  background-color: #ff5733;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #CC0000;
    transition: ease-in-out 0.2s;
  }
`;