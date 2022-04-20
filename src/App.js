import React from 'react';
import { useEffect, useState } from 'react';
import BasicCard from './components/MangaCard';
import Navbar from './components/Navbar';
import MangaApi from './services/MangaAPI';
import Auth, { AuthProvider } from './contexts/Auth';
import { Dashboard } from './pages/Account';
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';

export default function App(props) {
  const [data, setData] = useState({});
  const [session, setSession] = useState(null);
  const fetchData = async () => {
      const response = await MangaApi();
      console.log(response);
      let synopsis = response.data.data.attributes.synopsis;
      let poster = response.data.data.attributes.posterImage.medium;
      let title = response.data.data.attributes.canonicalTitle;
      let dataObject = {
        'title': title,
        'synopsis': synopsis,
        'posterURL': poster
      }
      setData(dataObject);
  };

  useEffect(() => {
    fetchData()
  },[]);
  
  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="container">
      <Navbar />
      <BasicCard passData={data}/>
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
