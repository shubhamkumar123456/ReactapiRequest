import React, { useState } from 'react';


import classes from './Movie.module.css';

const Movie = (props) => {
  const handleDelete=async(id)=>{
  try {
    console.log(id)
  
   const response= await fetch(`https://react-http-52a35-default-rtdb.firebaseio.com/movies/${id}.json`,{
     method: 'DELETE',
     headers:{
      'Content-Type': 'application/json',
     },
    })
    if(response.ok){
      console.log("deleted successfully")
    }
    // setdeleted(!deleted)
  } catch (error) {
    console.log(error)
  }
  props.fetchMovieHandler()
  }

  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button className='btn btn-danger' onClick={()=>{handleDelete(props.id)}}>Delete Movie</button>
    </li>
  );
};

export default Movie;
