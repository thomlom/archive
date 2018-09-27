import React, { Component } from 'react';
import styled from 'styled-components';

import Header from './Header'
import Search from './Search';
import MovieList from './MovieList';
import NoResults from './NoResults';
import Footer from './Footer';

const Container = styled.div`
  padding: 2rem 4rem;
  background: linear-gradient(to top, #F7BB97, #E48AA8);

  @media (max-width: 600px) {
    padding: 1rem 2rem;
  }

  @media (max-width: 500px) {
    padding: 0.75rem 1.5rem;
  }
`

const MovieContainer = styled.div`
  min-height: 100vh;
`

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: [],
      hasNotFound: false
    }
  }

  updateMovies = ({ Response: status, Search: movies }) => {
    if (status === "True") {
      this.setState({ movies, hasNotFound: false })
    } else {
      this.setState({
        hasNotFound: true
      })
    }
  }

  render() {
    return (
      <Container>
        <Header />
        <MovieContainer>
          <Search updateMovies={this.updateMovies} />
          {this.state.hasNotFound ? <NoResults /> : <MovieList movies={this.state.movies} />}
        </MovieContainer>
        <Footer />
      </Container>
    );
  }
}

export default App;
