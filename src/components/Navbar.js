import * as React from 'react';
import mochilogo from '../images/mochimangapink.jpeg';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import MenuItem from '@mui/material/MenuItem';
// import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

export default function Navbar(props, searchValue) {
  // const [anchorEl, setAnchorEl] = React.useState(null);

  // const isMenuOpen = Boolean(anchorEl);
  // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // const handleMobileMenuClose = () => {
  //   setMobileMoreAnchorEl(null);
  // };

  // const handleMenuClose = () => {
  //   setAnchorEl(null);
  //   handleMobileMenuClose();
  // };

  // const handleKeyPress = (e) => {
  //   if (e.key === 'Enter') {
  //     console.log(e.target.value);
  //     console.log(searchValue);
  //     props.setSearchValue(searchValue);
  //   }
  // };

  // const menuId = 'primary-search-account-menu';
  // const renderMenu = (
  //   <Menu
  //     anchorEl={anchorEl}
  //     anchorOrigin={{
  //       vertical: 'top',
  //       horizontal: 'right',
  //     }}
  //     id={menuId}
  //     keepMounted
  //     transformOrigin={{
  //       vertical: 'top',
  //       horizontal: 'right',
  //     }}
  //     open={isMenuOpen}
  //     onClose={handleMenuClose}
  //   >
  //     <MenuItem onClick={handleMenuClose}>My account</MenuItem>
  //     <MenuItem onClick={handleMenuClose}>My favorites</MenuItem>
  //     <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
  //   </Menu>
  // );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Link href="/home">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <img src={mochilogo} alt="" className="mochi--logo" />
            </IconButton>
          </Link>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Mochi Manga
          </Typography>
          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onKeyPress={handleKeyPress}
            />
          </Search> */}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Link href="/search" style={{ textDecoration: 'none' }}>
                <Button sx={{ my: 2, color: 'black', display: 'block' }}>
                  SEARCH
                </Button>
              </Link>
              <Link href="/login" style={{ textDecoration: 'none' }}>
                <Button sx={{ my: 2, color: 'black', display: 'block' }}>
                  SIGN IN
                </Button>
              </Link>
              <Link href="/dashboard" style={{ textDecoration: 'none' }}>
                <Button sx={{ my: 2, color: 'black', display: 'block' }}>
                  ACCOUNT
                </Button>
              </Link>
            </Box>
            {/* <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              // aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton> */}
          </Box>
          {/* <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box> */}
        </Toolbar>
      </AppBar>
      {/* {renderMobileMenu} */}
      {/* {renderMenu} */}
    </Box>
  );
}
