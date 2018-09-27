import React from 'react'
import styled from 'styled-components';

const StyledFooter = styled.footer`
  margin-top: 20px;
  color: #333;
  font-weight: 700;
  text-align: center;
`

const Footer = () => (
  <StyledFooter>
    <i className="fa fa-code"></i><span style={{ marginLeft: '5px' }}> by thomlom</span>
  </StyledFooter>
)

export default Footer;