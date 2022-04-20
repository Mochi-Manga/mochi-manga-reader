import React from 'react';
import { useEffect, useState } from 'react';
import BasicCard from './components/MangaCard';
import Navbar from './components/Navbar';
import MangaApi from './services/MangaAPI';

export default function App(props) {
  const [data, setData] = useState({});
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
  
  return (
    <div className="App">
      <Navbar />
      <BasicCard passData={data}/>
    </div>
  );
}