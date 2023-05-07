import React,{useEffect, useState, useCallback} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import AddMovie from './components/AddMovie';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);

   

  const handleErrorClick=(Interval)=>{
    setisLoading(false);
    setError(null)
    clearInterval(Interval);
   
  }

 const  fetchMovieHandler =useCallback(async()=>{
    setisLoading(true);
    setError(null)
    try {
      const response=await fetch('https://react-http-52a35-default-rtdb.firebaseio.com/movies.json')
      if(!response.ok){
        throw new Error('Something went wrong....Retrying')
      }
    const data=await response.json()
      // console.log(data)
      const loadedMovies= [];
      for(const key in data){
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText:data[key].openingText,
          releaseDate:data[key].releaseDate
        })
      }
   
    setMovies(loadedMovies);
    setisLoading(false)
    } catch (error) {
      setError(error.message)
    }
    setisLoading(false)
  },[])
  useEffect(()=>{
    fetchMovieHandler();
  },[fetchMovieHandler])

  async function addMovieHandler(movie) {
    // console.log(movie);
 try {
  const response=await fetch('https://react-http-52a35-default-rtdb.firebaseio.com/movies.json',{
    method: 'POST',
    body:JSON.stringify(movie),
    headers:{
      'Content-Type': 'application/json',
    }
  });
  const data=await response.json()
  console.log(data)
 } catch (error) {
    console.log(error)
 }
 fetchMovieHandler()
  }
 

  let content = <p>Found no movies.</p>
  if(movies.length > 0){
    content=<MoviesList movies={movies} fetchMovieHandler={fetchMovieHandler}/>
  }
  if(error){
    content = <p>{error} <button onClick={()=>{handleErrorClick()}}>cancel retrying</button></p>
  //  const Interval=setInterval(()=>{
  //     // fetchMovieHandler()
  //   },5000)
    
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
