import { useState, useEffect } from "react";
import { Route,Switch,Redirect,useHistory,useLocation,} from "react-router-dom";
import Header from "../Header/Header";
import SignIn from "../SignIn/SignIn";
import Register from "../Register/Register";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import Main from "../Main/Main";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import InfoModal from "../InfoModal/InfoModal";
import Preloader from "../Preloader/Preloader";
import "./App.css";
import {mainApi} from "../../utils/MainApi";
import CurrentUserContext from "../../context/CurrentUserContext";

const App = () => {
  const location = useLocation();
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [moviesList, setMoviesList] = useState([]);
  const [infoModal, setInfoModal] = useState({
    isOpen: false,
    successful: true,
    text: "",
  });
  const headerEndpoints = ["/movies", "/saved-movies", "/profile", "/"];
  const footerEndpoints = ["/movies", "/saved-movies", "/"];

  useEffect(() => {
    const path = location.pathname;
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoading(true);
      mainApi.getMe(token)
        .then((data) => {
          if (data) {
            setIsLogin(true);
            setCurrentUser(data);
            history.push(path);
          }
        })
        .catch((err) =>
        setInfoModal({
            isOpen: true,
            successful: false,
            text: err,
          })
        )
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    if (isLogin) {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      mainApi
        .getMe(token)
        .then((res) => {
          setCurrentUser(res)
        })
        .catch((err) =>
        setInfoModal({
            isOpen: true,
            successful: false,
            text: err,
          })
        )
        .finally(() => setIsLoading(false));
    }
  }, [isLogin]);

  useEffect(() => {
    if (isLogin && currentUser) {
      const token = localStorage.getItem("token");
      mainApi
        .getMyMovies(token)
        .then((data) => {
          const UserMoviesList = data.filter(
            (item) => item.owner === currentUser._id
          );
          setMoviesList(UserMoviesList);
        })
        .catch((err) =>
        setInfoModal({
            isOpen: true,
            successful: false,
            text: err,
          })
        );
    }
  }, [currentUser, isLogin]);

  const signUp = (data)=> {
    setIsLoading(true);
    mainApi.signUp(data)
      .then((res) => {
        if (res._id) {
          signIn({ email:data.email, password:data.password });
        }
      })
      .catch((err) =>
      setInfoModal({isOpen: true,successful: false,text: err,})
      )
      .finally(() => setIsLoading(false));
  }

  const signIn = (data) => {
    setIsLoading(true);
    mainApi.signIn(data)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          setIsLogin(true);
          history.push("/movies");
         setInfoModal({
            isOpen: true,
            successful: true,
            text: "Добро пожаловать!",
          });
        }
      })
      .catch((err) =>
      setInfoModal({isOpen: true, successful: false,text: err,})
      )
      .finally(() => setIsLoading(false));
  }

  const closeInfoModal= () => {
    setInfoModal({ ...infoModal, isOpen: false });
  }

 const editInfo = (data)=> {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    mainApi
      .editMe(data,token)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        setInfoModal({
          isOpen: true,
          successful: true,
          text: "Ваши данные обновлены!",
        });
      })
      .catch((err) =>
      setInfoModal({
          isOpen: true,
          successful: false,
          text: err,
        })
      )
      .finally(() => setIsLoading(false));
  }

  const signOut= () => {
    setCurrentUser({});
    setIsLogin(false);
    localStorage.clear();
    history.push("/");
  }

  const addMovie = (movie) => {
    const token = localStorage.getItem("token");
    mainApi
      .addMovie(movie,token)
      .then((newMovie) => setMoviesList([newMovie, ...moviesList]))
      .catch((err) =>
      setInfoModal({
          isOpen: true,
          successful: false,
          text: err,
        })
      );
  }

  const deleteMovie = (movie) => {
    const token = localStorage.getItem("token");
    const savedMovie = moviesList.find(
      (item) => item.movieId === movie.id || item.movieId === movie.movieId
    );
    mainApi.deleteMovie(savedMovie._id,token)
      .then(() => {
        const newMoviesList = moviesList.filter((m) => {
          if (movie.id === m.movieId || movie.movieId === m.movieId) {
            return false;
          } else {
            return true;
          }
        });
        setMoviesList(newMoviesList);
      })
      .catch((err) =>
      setInfoModal({
          isOpen: true,
          successful: false,
          text: err,
        })
      );
  }

   return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <Route exact path={headerEndpoints}>
          <Header authorized={isLogin} />
        </Route>
        <Switch>
          <ProtectedRoute
            path="/movies"
            component={Movies}
            isLogin={isLogin}
            setIsLoading={setIsLoading}
            setInfoModal={setInfoModal}
            savedMoviesList={moviesList}
            onAdd={addMovie}
            onDelete={deleteMovie}
          />
          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            isLogin={isLogin}
            savedMoviesList={moviesList}
            onDelete={deleteMovie}
            setInfoModal={setInfoModal}
          />
          <Route exact path="/signup">
            {!isLogin ? (
              <Register signUp={signUp} />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route exact path="/signin">
            {!isLogin ? (
              <SignIn signIn={signIn} />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <ProtectedRoute
            path="/profile"
            component={Profile}
            isLogin={isLogin}
            editInfo={editInfo}
            signOut={signOut}
          />
          <Route path="/" exact>
            <Main />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        <Route exact path={footerEndpoints}>
          <Footer />
        </Route>
        {isLoading && <Preloader />}
        <InfoModal data={infoModal} onClose={closeInfoModal} />
      </CurrentUserContext.Provider>
    </div>
  );
};

export default App;
