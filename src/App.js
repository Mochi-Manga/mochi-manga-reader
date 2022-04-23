import './App.css';
import Navbar from './components/Navbar';
import { AuthProvider } from './contexts/Auth';
import { Dashboard } from './pages/Account';
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import MangaApi from './services/MangaAPI';
import MangaCardPoster from './components/MangaCardPoster';
import SearchManga from './pages/Search';
import Main from './pages/Main';
import Browse from './pages/Browse';

function App() {
  const [session, setSession] = useState(null);
  const [data, setData] = useState({});
  const [manga, setMangas] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const fetchData = async () => {
    const response = await MangaApi();
    setData(response.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const getMangaRequest = async () => {
  //   const url = `https://kitsu.io/api/edge/manga?filter[text]=${searchValue}`;
  //   const response = await fetch(url);
  //   const responseJson = await response.json();
  //   console.log(responseJson.data);

  //   if (responseJson.data) {
  //     setMangas(responseJson.data);
  //   }
  // };

  // useEffect(() => {
  //   console.log('is this working');
  //   const delaySearch = setTimeout(() => {
  //     getMangaRequest(searchValue);
  //   }, 500);
  //   return () => clearTimeout(delaySearch);
  // }, [searchValue]);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="container">
      <Navbar searchValue={searchValue} setSearchValue={setSearchValue} />
      <Router>
        <AuthProvider>
          <Routes>
            <Route
              exact
              path="/home"
              element={
                <>
                  <Main />
                  <MangaCardPoster dataFromApp={data} />
                </>
              }
            />
            <Route
              exact
              path="/login"
              element={
                !session ? (
                  <Login />
                ) : (
                  <Dashboard key={session.user.id} session={session} />
                )
              }
            />
            <Route
              exact
              path="/signup"
              element={
                !session ? (
                  <Signup />
                ) : (
                  <Dashboard key={session.user.id} session={session} />
                )
              }
            />
            <Route
              exact
              path="/dashboard"
              element={
                !session ? (
                  <Login />
                ) : (
                  <Dashboard key={session.user.id} session={session} />
                )
              }
            />
            <Route exact path="/search" element={<SearchManga />} />
            <Route exact path="/browse" element={<Browse />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
