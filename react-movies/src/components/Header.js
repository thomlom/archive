import React from 'react'
import styled from 'styled-components';

const StyledHeader = styled.p`
  text-align: center;
  color: #fff;
  font-size: 4rem;
  font-family: 'Playfair Display';
  font-weight: 700;

  @media (max-width: 600px) {
    font-size: 3rem;
  } 

  @media (max-width: 500px) {
    font-size: 2.4rem;
  } 
`

const Header = () => (
  <StyledHeader>
    Movie viewer
  </StyledHeader>
)

export default Header;