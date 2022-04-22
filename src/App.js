import './App.css';
import Navbar from './components/Navbar';
import Auth, { AuthProvider } from './contexts/Auth';
import { Dashboard } from './pages/Account';
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import MangaList from './components/MangaList';
import MangaApi from './services/MangaAPI';
import SearchManga from './pages/Search';
import Main from './pages/Main';

function App() {
  const [session, setSession] = useState(null);
  const [manga, setMangas] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getMangaRequest = async () => {
    const url = `https://kitsu.io/api/edge/manga?filter[text]=${searchValue}`;
    const response = await fetch(url);
    const responseJson = await response.json();
    console.log(responseJson.data);

    if (responseJson.data) {
      setMangas(responseJson.data);
    }
  };

  useEffect(() => {
    console.log('is this working');
    const delaySearch = setTimeout(() => {
      getMangaRequest(searchValue);
    }, 500);
    return () => clearTimeout(delaySearch);
  }, [searchValue]);

  //  const fetchData = async () => {
  //     const response = await MangaApi();
  //     console.log(response);
  //     let synopsis = response.data.data.attributes.synopsis;
  //     let poster = response.data.data.attributes.posterImage.medium;
  //     let title = response.data.data.attributes.canonicalTitle;
  //     let dataObject = {
  //       'title': title,
  //       'synopsis': synopsis,
  //       'posterURL': poster
  //     }
  //     setData(dataObject);
  // };

  // useEffect(() => {
  //   fetchData()
  // },[]);

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
            <Route exact path="/home" element={<Main />} />
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
            <Route
              exact
              path="/search"
              element={<MangaList mangas={manga} />}
            />
            <Route
              exact
              path="/searchtemp"
              element={
                <SearchManga
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                />
              }
              element={<MangaList mangas={manga} />}
            />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
