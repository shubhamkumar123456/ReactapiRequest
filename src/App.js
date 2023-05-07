import React,{useEffect, useState, useCallback} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import AddMovie from './components/AddMovie';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);

    useEffect(()=>{
      fetchMovieHandler();
    },[])

  const handleErrorClick=(Interval)=>{
    setisLoading(false);
    setError(null)
    clearInterval(Interval);
   
  }

 const  fetchMovieHandler =useCallback(async()=>{
    setisLoading(true);
    setError(null)
    try {
      const response=await fetch('https://swapi.dev/api/films')
      if(!response.ok){
        throw new Error('Something went wrong....Retrying')
      }
    const data=await response.json()

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
    } catch (error) {
      setError(error.message)
    }
    setisLoading(false)
  })

  function addMovieHandler(movie) {
    console.log(movie);
  }

  let content = <p>Found no movies.</p>
  if(movies.length > 0){
    content=<MoviesList movies={movies} />
  }
  if(error){
    content = <p>{error} <button onClick={()=>{handleErrorClick(Interval)}}>cancel retrying</button></p>
   const Interval=setInterval(()=>{
      fetchMovieHandler()
    },5000)
    
  }
  if(isLoading){
    content=<p>Loading.....</p>
  }
  

  return (
    <React.Fragment>
       <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
       {content}
      </section>
    </React.Fragment>
  );
}

export default App;
