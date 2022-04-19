import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MainManga = (props) => {
  //   const [poster, setPoster] = useState([]);
  //   useEffect(async () => {
  //     // Update the document title using the browser API
  //     const manga = await axios.get('https://kitsu.io/api/edge/manga');
  //     console.log(manga);
  //     const mangaData = manga.data.data;
  //     const posterArray = [];
  //     mangaData.forEach((element) => {
  //       posterArray.push(element.attributes.posterImage.medium);
  //     });
  //     console.log(posterArray);
  //     setPoster(posterArray);
  //   }, []);

  //   return (
  //     <div>
  //       <h1>img</h1>
  //       {poster.map((p) => (
  //         <img src={p} />
  //       ))}
  //     </div>
  //   );
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const axiosPosts = async () => {
      const response = await axios('https://kitsu.io/api/edge/manga');
      const mangaInfo = [];
      console.log(response.data.data);
      let mangaData = response.data.data;
      mangaData.forEach((element) => {
        mangaInfo.push(element.attributes);
      });

      console.log('is this info:', mangaInfo);
      setPosts(mangaInfo);
      //   console.log(response.data.data);
      //   const posterArray = [];
      //   response.data.data.forEach((element) => {
      //     posterArray.push(element.attributes.posterImage.medium);
      //   });
      //   console.log(posterArray);
    };
    axiosPosts();
  }, []);

  const useaxiosPosts = posts.map((p) => {
    console.log(p.titles.en);
    return (
      <div>
        <img src={p.posterImage.medium} alt={p} />
        <h3>{p.titles.en}</h3>
      </div>
    );
  });

  return (
    <>
      <h1>Mochi Manga</h1>

      <div className="axioscontainer">{useaxiosPosts}</div>
    </>
  );
};

export default MainManga;
