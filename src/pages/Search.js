import React from 'react';
import { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/material';
import MangaList from '../components/MangaList';

const SearchBar = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.light, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.25),
  },
  marginRight: 700,
  marginLeft: 0,
  marginTop: 20,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function SearchManga(props) {
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
    console.log('searchtemp is this working');
    const delaySearch = setTimeout(() => {
      getMangaRequest(searchValue);
    }, 500);
    return () => clearTimeout(delaySearch);
  }, [searchValue]);

  const handleKeyPress = (e) => {
    // e.preventDefault();

    if (e.key === 'Enter') {
      //   console.log('what is this', props);
      setSearchValue(e.target.value);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <SearchBar>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          onKeyPress={handleKeyPress}
        />
      </SearchBar>
      <MangaList mangas={manga} />
    </Box>
  );
}
