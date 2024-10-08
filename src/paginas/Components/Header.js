// Header.js
import React from 'react';
import styled from 'styled-components';
import { FaSpotify } from 'react-icons/fa';

const Header = ({ token, loginUrl, logout }) => {
  return (
    <HeaderContainer>
      <LogoContainer>
        <FaSpotify size={30} color="white" />
        <LogoText>Spotify Clone</LogoText>
      </LogoContainer>
      <ButtonContainer>
        {!token ? (
          <LoginButton href={loginUrl}>Login com Spotify</LoginButton>
        ) : (
          <LogoutButton onClick={logout}>Logout</LogoutButton>
        )}
      </ButtonContainer>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: #1db954;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoText = styled.h1`
  font-size: 1.5rem;
  color: white;
  margin-left: 0.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LoginButton = styled.a`
  background-color: white;
  color: #1db954;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const LogoutButton = styled.button`
  background-color: #f44336;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d32f2f;
  }
`;
