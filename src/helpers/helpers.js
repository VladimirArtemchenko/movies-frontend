import { MOVIES_DURATION } from "../utils/const.js";

const formatData = (movies) => {
  movies.forEach((movie) => {
    if (!movie.image) {
      movie.image =
        "https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGZpbG18ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60";
      movie.thumbnail =
        "https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGZpbG18ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60";
    } else {
      movie.thumbnail = `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`;
      movie.image = `https://api.nomoreparties.co${movie.image.url}`;
    }
    if (!movie.country) {
      movie.country = "Russia";
    }
    if (!movie.nameEN) {
      movie.nameEN = movie.nameRU;
    }
  });
  return movies;
}

const filteringShort = (movies) => {
  return movies.filter((movie) => movie.duration < MOVIES_DURATION);
}

const filtering = (movies, query, isFiltering) => {
  const moviesByUserQuery = movies.filter((movie) => {
    const movieRu = String(movie.nameRU).toLowerCase().trim();
    const movieEn = String(movie.nameEN).toLowerCase().trim();
    const userMovie = query.toLowerCase().trim();
    return (
      movieRu.indexOf(userMovie) !== -1 || movieEn.indexOf(userMovie) !== -1
    );
  });

  if (isFiltering) {
    return filteringShort(moviesByUserQuery);
  } else {
    return moviesByUserQuery;
  }
}

const transformDuration = (duration) => {
  const hours = Math.trunc(duration / 60);
  const minutes = duration % 60;
  if (hours === 0) {
    return `${minutes}м`;
  } else {
    return `${hours}ч ${minutes}м`;
  }
}

const getSavedMovieCard = (arr, movie) => {
  return arr.find((item) => {
    return item.movieId === (movie.id || movie.movieId);
  });
}

export {
  formatData,
  filtering,
  filteringShort,
  transformDuration,
  getSavedMovieCard,
};
