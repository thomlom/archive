import React from 'react'
import styled from 'styled-components';

import unknownImage from '../img/unknown.jpg'

const StyledMovie = styled.div`
  display: flex;
  flex-direction: column;
  background: #eee;
  border-radius: 25px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
`

const MovieImageContainer = styled.div`
  position: relative;
  width: 100%;
`

const MovieImage = styled.img`
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  display: block;
  object-fit: cover;
  height: 35rem;
  width: 100%;

  @media (max-width: 600px) {
    height: 30rem;
  }

  @media (max-width: 500px) {
    height: 22rem;
  }
`

const SeeMovieButton = styled.a`
  position: absolute;
  bottom: 15px;
  right: 15px;
  padding: 1rem;
  background-color: #056dfb;
  color: #fff;
  text-decoration: none;
  border: none;
  border-radius: 20px;
  font-size: 1.2rem;
  font-family: 'Open Sans';
  font-weight: 700;
  cursor: pointer;
  transition: all .3s;

  &:hover {
    background-color: #0452BF;
  }
`

const MovieDetails = styled.div`
  padding: 1.5rem;
`

const MovieTitle = styled.p`
  font-size: 1.8rem;
  font-family: 'Playfair Display';
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const MovieYear = styled.span`
  font-size: 1.5rem;
  color: #888;
`

const Movie = ({ movie: { Poster: posterURL, Title: title, Year: year, imdbID: id } }) => {
  let url = posterURL === 'N/A' ? unknownImage : posterURL
  return (
    <StyledMovie>
      <MovieImageContainer>
        <MovieImage src={url} alt={title}></MovieImage>
        <SeeMovieButton href={`https://www.imdb.com/title/${id}`} target="_blank">More</SeeMovieButton>
      </MovieImageContainer>
      <MovieDetails>
        <MovieTitle>
          {title}
        </MovieTitle>
        <MovieYear>
          ({year})
        </MovieYear>
      </MovieDetails>
    </StyledMovie>
  );
};

export default Movie;