import './App.css';
import Navbar from './components/Navbar';
import Auth from './pages/Auth';
import Account from './pages/Account';
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="container">
      <Navbar />
      <Router>
        <Routes>
          <Route exact path="/home" />
          <Route
            exact
            path="/signin"
            element={
              !session ? (
                <Auth />
              ) : (
                <Account key={session.user.id} session={session} />
              )
            }
          />
          <Route
            exact
            path="/account"
            element={
              !session ? (
                <Auth />
              ) : (
                <Account key={session.user.id} session={session} />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
};
