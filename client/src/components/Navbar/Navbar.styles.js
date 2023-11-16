import styled from 'styled-components';

export const Nav = styled.nav`
  background-color: white;
  display: flex;
  justify-content: space-around;

  border-bottom: 1px solid #ccc;
`;

export const NavItem = styled.a`
  flex: 1;
  padding: 15px 20px;
  text-align: center;
  border-bottom: ${props => (props.active ?  '2px solid #8A2BE2' : '')};
  color: ${props => (props.active ?  'black' : '#536471')};
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
  transition: ease-in-out 0.1s;
  &:hover {
    background-color: #f0f0f0;
  }
`;