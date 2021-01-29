import React from 'react';
import FilterPoke from './FilterPoke';
import './style/App.css';

const URL_PATH = `https://gist.githubusercontent.com/bar0191/fae6084225b608f25e98b733864a102b/raw/dea83ea9cf4a8a6022bfc89a8ae8df5ab05b6dcc/pokemon.json`;

class App extends React.Component {
    state = {
      data: [],
      loading: false,
      error: null,
    };
  
    fetchPokemons = async () => {
      this.setState({ loading: true, error: null });
  
      try {
        const response = await fetch(URL_PATH);
        const data = await response.json();
        this.setState({ loading: false, data: data });
      } catch (error) {
        this.setState({ loading: false, error: error.message });
      }
    };
  
    componentDidMount() {
      this.fetchPokemons();
    }
  
    render() {
      if (this.state.error) {
        return <p>An error has ocurred: {this.state.error.message}</p>;
      }
  
      return (
        <>
          {this.state.loading && <div className="loader"></div>}
          <FilterPoke pokemons={this.state.data} />
        </>
      );
    }
  }
  export default App;