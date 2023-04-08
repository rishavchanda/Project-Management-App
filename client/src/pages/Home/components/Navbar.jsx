import React from 'react'
import styled from 'styled-components'
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const Container = styled.div`
width: 90%;
max-width: 1320px;
  height: 60px;
  margin: 12px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 768px) {
    padding: 0px 20px !important;
  }
`;
const Logo = styled.h1`
  font-weight: 600;
  font-size: 20px;
  color: ${({ theme }) => theme.primary};
`;

const Menu = styled.ul`
  display: flex;
  align-items: center;
  gap: 20px;
  list-style: none;
  @media (max-width: 768px) {
    display: none;
  }
`;

const MenuItem = styled.a`
  font-size: 16px;
  text-decoration: none;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;



const Button = styled.button`
  padding: 5px 18px;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 15px;
  border-radius: 100px;
  transition: all 0.3s ease;
  &:hover {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text};
  }
`;
const Navbar = ({ setSignInOpen }) => {

  return (
    <Container>
      <Logo>VEXA</Logo>
      <Menu>
        <MenuItem href="#home">Home</MenuItem>
        <MenuItem href="#features">Features</MenuItem>
        <MenuItem href="#benefits">Benifits</MenuItem>
        <MenuItem href="#team">Team</MenuItem>
      </Menu>
      <Button onClick={() => setSignInOpen(true)}>
        <AccountCircleOutlinedIcon /> Sign In
      </Button>

    </Container>
  )
}

export default Navbar