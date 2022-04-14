import './App.css';
import Navbar from './components/Navbar';
import Auth from './Auth';
import Account from './Account';
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

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
      {!session ? (
        <Auth />
      ) : (
        <Account key={session.user.id} session={session} />
      )}
    </div>
  );
};
