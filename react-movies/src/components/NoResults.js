import React from "react";
import styled from "styled-components";

const StyledNoResults = styled.p`
  text-align: center;
  color: #fff;
  font-size: 2.4rem;
  font-weight: 700;
  margin-top: 2rem;

  @media (max-width: 600px) {
    font-size: 1.8rem;
  }
`

const StyledText = styled.p`

`

const NoResults = () => (
  <StyledNoResults>
    Nothing found! Maybe try with fewer keywords <i className="fas fa-thumbs-up"></i>
  </StyledNoResults>
)

export default NoResults