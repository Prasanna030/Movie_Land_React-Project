import {useEffect, useState}from "react";
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from "./MovieCard";

//7f75c1a8

const API_URL= 'http://www.omdbapi.com?apikey=7f75c1a8'

const movie1= {
    "Title": "Frozen",
    "Year": "2010",
    "imdbID": "tt1323045",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTc5MTg0ODgxMF5BMl5BanBnXkFtZTcwODEzOTYwMw@@._V1_SX300.jpg"
}

const App = () => {
    const [movies,setMovies]= useState([]);
    const [searchTerm,setSearchTerm]=useState([]);
    const searchMovies= async(title)=>{
        const response= await fetch(`${API_URL}&s=${title}`); 
        const data = await response.json();
        setMovies(data.Search);
    }
    useEffect(()=>{
      searchMovies('Frozen')
    },[])
    return(
        <div className="app">
            <h1>MovieLand</h1>
            <div className="search">
                <input
                  placeholder="Search for Movies"
                  value={searchTerm}
                  onChange={(e)=>{setSearchTerm(e.target.value)}}
                 />
                 <img 
                  src={SearchIcon}
                  alt="search"
                  onClick={()=>searchMovies(searchTerm)}
                 />
            </div>
            {movies?.length>0
                ?( <div className="container">
                     {movies.map((movie)=>(
                        <MovieCard movie={movie}/>
                     ))}
                     </div>
                ):(
                <div className="empty">
                    <h2>no movies found</h2>
                </div>
                )}

           
        </div>
    );
}

export default App;