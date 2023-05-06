import React,{useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  async function fetchMovieHandler(){
    setisLoading(true);
    const response=await fetch('https://swapi.dev/api/films')
    const data=await response.json()
    // console.log(data.results)
    const transformedMovies=data.results.map(movieData=>{
      return{
        id: movieData.episode_id,
        title: movieData.title,
        openingText:movieData.opening_crawl,
        releaseData:movieData.release_date
      }
    });
    setMovies(transformedMovies);
    setisLoading(false)
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading &&<MoviesList movies={movies} />}
        {isLoading && <p>Loading data...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
