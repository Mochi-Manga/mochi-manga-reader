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

function App() {
  const [session, setSession] = useState(null);
  const [manga, setMangas] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getMangaRequest = async () => {
    const url = `https://kitsu.io/api/edge/manga?filter[text]=${searchValue}`;
    const response = await fetch(url);
    const responseJson = await response.json();

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
            <Route exact path="/home" />
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
          </Routes>
        </AuthProvider>
        <MangaList mangas={manga} />
      </Router>
    </div>
  );
}

export default App;
