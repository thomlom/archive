import React, { Component } from 'react';
import styled from "styled-components";

import request from '../api/request'
import SearchBuilder from '../api/SearchBuilder'

const StyledSearch = styled.div`
  margin-top: 10px;
  display: flex;
  justify-items: center;
  align-items: center;
`

const Input = styled.input`
  position: relative;
  font-size: 1.5rem;
  font-family: 'Open Sans';
  padding: 1.5rem 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  color: #333;
  border: none;
  width: 100%;

  &:focus {
    outline: none;
  }

  @media (max-width: 600px) {
    font-size: 1.2rem;
    padding: 1.2rem 1.7rem;
  }
`

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: ''
    }
  }

  handleTitleChange = (e) => {
    this.setState({ title: e.target.value })
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      let search = new SearchBuilder()
      search.title(this.state.title)
      request(search.url).then(data => this.props.updateMovies(data))
    }
  }

  render() {
    return (
      <StyledSearch>
        <Input
          placeholder="Search for movies..."
          onChange={this.handleTitleChange}
          onKeyPress={this.handleKeyPress}
        ></Input>
      </StyledSearch>
    )
  }
}

export default Search