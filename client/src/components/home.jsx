import React, { useEffect, useState, useCallback } from 'react';

const MovieCard = ({ movie, rating, handleRating }) => {
  return (
    <div className="movie-item" style={{ margin: '20px', textAlign: 'center', width: '90%' }}>
      <h3 style={{ fontSize: '24px' }}>{movie.name}</h3>
      <div>
        {Array.from({ length: 5 }, (_, idx) => (
          <span
            key={idx + 1}
            onClick={() => handleRating(idx + 1)}
            className={`star ${idx < rating ? 'selected' : ''}`}
            style={{ cursor: 'pointer', fontSize: '30px' }} 
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
};

const TodoList = () => {
  const [ratedMovies, setRatedMovies] = useState([]);
  const [unratedMovies, setUnratedMovies] = useState([]); 
  const [currentMovies, setCurrentMovies] = useState([]);
  const [movie, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [ratings, setRatings] = useState([0, 0]);
  const [view, setView] = useState('unrated');
  
  const API_KEY = '6b6J5sfMp4sikstklgJPsGgL9GM0yaZR';

  const fetchMovies = useCallback(async () => {
    try {
      const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}`);
      const data = await response.json();
      const movieData = data.results.map((movie) => ({
        id: movie.id,
        name: movie.name,
        image: movie.background_image,
        userRating: 0,
      }));
      setMovies(movieData);
      setCurrentMovies(getRandomMovies(movieData));
    } catch (error) {
      console.error('Error fetching the movies:', error);
    }
  }, [API_KEY]);

  useEffect(() => {
    setRatedMovies([]);
    setUnratedMovies([]);
    setSearch('');
    fetchMovies();
  }, [fetchMovies]);

  const getRandomMovies = (movieList) => {
    const shuffled = movieList.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2); 
  };

  const addRating = () => {
    currentMovies.forEach((currentMovies, index) => {
      const ratingValue = ratings[index];
      const newMovie = {
        text: currentMovies.name,
        rated: ratingValue > 0,
        rating: ratingValue,
      };

      if (ratingValue > 0) {
        setRatedMovies((prevRatedMovies) => [...prevRatedMovies, newMovie]);
      } else {
        setUnratedMovies((prevUnratedMovies) => [...prevUnratedMovies, newMovie]);
      }
    });
    fetchNewMovies();
  };

  const fetchNewMovies = () => {
    const remainingMovies = movie.filter(movies => !currentMovies.some(current => current.id === movies.id));
    setCurrentMovies(getRandomMovies(remainingMovies));
    setRatings([0, 0]); 
  };

  const handleRating = (index, ratingValue) => {
    setRatings(prevRatings => {
      const newRatings = [...prevRatings];
      newRatings[index] = ratingValue;
      return newRatings;
    });
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredMovies = movie.filter(movies =>
    movie.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleMovieSelection = (movie) => {
    setCurrentMovies([movie]);
    setSearch('');
  };

  const toggleView = (event) => {
    setView(event.target.value);
  };

  const displayMovies = view === 'unrated' ? unratedMovies : ratedMovies;

  const markAsRated = (index) => {
    const movieToMark = displayMovies[index];

    if (view === 'rated') {
      setRatedMovies((prev) => prev.filter((_, i) => i !== index));
      setUnratedMovies((prev) => [
        ...prev,
        { text: movieToMark.text, rated: false, rating: 0 } 
      ]);
    } else {
      setRatedMovies((prev) => [...prev, { ...movieToMark, rated: true }]);
      setUnratedMovies((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const markAsUnrated = (index) => {
    const movieToUnmark = displayMovies[index];
    setUnratedMovies((prev) => [
      ...prev,
      { text: movieToUnmark.text, rated: false, rating: 0 } 
    ]);
    setRatedMovies((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="todo-list">
      <h2>Rate My Movies</h2>

      <div style={{ position: 'relative' }}>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={search}
          onChange={handleSearch}
        />

        {search && filteredMovies.length > 0 && (
          <ul style={{ 
            position: 'absolute', 
            zIndex: '1', 
            backgroundColor: 'white', 
            border: '1px solid #ccc', 
            listStyle: 'none', 
            padding: '0', 
            margin: '0', 
            maxHeight: '150px',
            overflowY: 'auto',
            width: '100%'
          }}>
            {filteredMovies.map((movie) => (
              <li key={movie.id} style={{ padding: '8px', cursor: 'pointer' }}>
                <button 
                  onClick={() => handleMovieSelection(movie)}
                  style={{ textDecoration: 'none', color: 'black', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  {movie.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <h2>Current Movies</h2>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {currentMovies.map((movie, index) => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            rating={ratings[index]}
            handleRating={(ratingValue) => handleRating(index, ratingValue)} 
          />
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <button onClick={addRating} style={{ margin: '20px auto', padding: '10px 20px', fontSize: '16px' }}>
          Submit Rating
        </button>
      </div>

      <h2>Rated Movies</h2>
      <div>
        <label htmlFor="movie-view">Select view:</label>
        <select id="movie-view" value={view} onChange={toggleView}>
          <option value="unrated">Unrated Movies</option>
          <option value="rated">Rated Movies</option>
        </select>
      </div>

      <ul>
        {displayMovies.map((movie, index) => (
          <li key={index}>
            <span style={{ textDecoration: movie.rated ? 'none' : 'line-through' }}>
              {movie.text} - Rated: {movie.rating} ★
            </span>
            <button onClick={() => markAsRated(index)}>
              {view === 'unrated' ? 'Mark as Rated' : 'Mark as Unrated'}
            </button>
            <button onClick={() => {
              if (view === 'unrated') {
                setUnratedMovies(unratedMovies.filter((_, i) => i !== index));
              } else {
                markAsUnrated(index); 
              }
            }}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;