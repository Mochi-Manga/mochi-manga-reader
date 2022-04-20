import './App.css';
import Navbar from './components/Navbar';
import Auth, { AuthProvider } from './contexts/Auth';
import { Dashboard } from './pages/Account';
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';

function App() {
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
              // element={
              //   !session ? (
              //     <AuthProvider />
              //   ) : (
              //     <Account key={session.user.id} session={session} />
              //   )
              // }
              element={<Dashboard />}
            />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
