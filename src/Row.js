import React, { useEffect, useState } from 'react'
import './Row.css'
import axios from './axios'
import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer';

function Row({ title, fetchUrl, isLargeRow = false }) {
    const API_KEY = "53947cc30f1456afde53d20c3477d93f"
    const [movies, setMovies] = useState([])
    const [trailerUrl, settrailerUrl] = useState([])

    const base_url = "https://image.tmdb.org/t/p/original/"

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl)
            setMovies(request.data.results)
            return request;
        }
        fetchData();
    }, [])

    const fetchMovie = async (id) => {
        if (trailerUrl) {
            settrailerUrl('')
        } else {
            const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
                params: {
                    api_key: API_KEY,
                    append_to_response: "videos"
                }
            })
    
            if (data.videos && data.videos.results) {
                const trailer = data.videos.results.find(vid => vid.name === "Official Trailer")
                settrailerUrl(trailer ? trailer : data.videos.results[0])
            }
        }
    }

    console.log(movies)

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
           autoplay: 1,
       } 
    }

    const handleClick = (movie) => {
        if (trailerUrl) {
            settrailerUrl('')
        } else {
            movieTrailer(movie.name || "")
                .then((url) => {
                    const urlParams = new URLSearchParams( new URL(url).search )
                    settrailerUrl(urlParams.get("v"))
                    console.log(urlParams.get("v"))
                })
                .catch((error) => console.log(error))
        }
    }

  return (
    <div className='row'>
        <h2>{title}</h2>

        <div className='row__posters'>
            { movies?.map( movie => (
                ((isLargeRow && movie.poster_path) ||
                (!isLargeRow && movie.backdrop_path)) && (
                    <img 
                    onClick={() => fetchMovie(movie.id)}
                    className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                    key={movie.id}
                    src={`${base_url}${
                        isLargeRow ? movie.poster_path : movie.backdrop_path
                    }`}
                    alt="" />
                )
            ))}
        </div>
        { trailerUrl.key && <YouTube videoId={trailerUrl.key} opts={opts} /> }
    </div>
  )
}

export default Row