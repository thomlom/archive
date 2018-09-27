import React, { Component } from 'react'
import styled from 'styled-components';

import Movie from './Movie'

const StyledMovieList = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
  grid-gap: 6rem;

  @media (max-width: 600px) {
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    grid-gap: 3rem;
  }
`

class MovieList extends Component {
  render() {
    return (
      <StyledMovieList>
        {this.props.movies.map((movie, index) => <Movie key={index} movie={movie} />)}
      </StyledMovieList>
    );
  }
}

export default MovieList